import React, { Component } from 'react';
import { List, Checkbox, TextArea, Input, Form, Button, Dimmer, Loader, Segment, Image, Select } from 'semantic-ui-react';
import axios from 'axios';
import { AdminTemplate } from '../../../components/Admin'
import { withRouter } from 'next/router'
import {API_URL} from "../../../constants";

const round10 = (v) => Math.round(v / 10) * 10;

class ProductEditor extends Component {

  state = { isLoading: true, categories: [] }

  componentDidMount() {
    const token = localStorage.getItem('access_token') || ''
    const AuthStr = 'Bearer '.concat(token)

    const { productId: id } = this.props

    this.setState({ AuthStr })

    if(id === 'new') {
      this.setState({
        product: {
          title: 'New Product Item',
          available: true,
          price: 0,
          discount: 0,
          img: '',
          url: '',
          label: '',
          category: '',
          page: {},
          pageDescr: '',
          pageFeautures: '',
          pageFunctions: '',
        }, 
        currency: { USD: 0 },
        isLoading: true
      })
    } else {
      axios.get(`${API_URL}/products/${id}`, { headers: { Authorization: AuthStr } }).then(({ data: { success, data, currency } }) => {
        if (success) {
          this.setState({
            product: {
              ...data,
              discount: Math.round(data.discount * 100),
              category: data.category._id,
              pageDescr: data.page.descr,
              pageFeautures: data.page.feautures.map(f => `${f.key}__${f.value}`).join('\n'),
              pageFunctions: data.page.functions.map(f => `${f.group}__\n${f.list.join('||\n')}||`).join('\n\n'),
             }, 
            isLoading: false,
            currency
          })
        }
      }, (err) => {
        console.log(err)
        this.setState({ product: null, isLoading: false })
      })
    }
    axios.get(`${API_URL}/products/categories`, { headers: { Authorization: AuthStr } }).then(({ data: { success, data } }) => {
      if (success) {
        this.setState({ 
          categories: data.map(v => ({ ...v, key: v._id, text: v.title, value: v._id }) ),
          isLoading: false
        })
      }
    }, (err) => {
      console.log(err)
    })
  }

  handleChangeProductProperty(e, data) {
    const { product } = this.state
    this.setState({
      product: {
        ...product,
        [data.name]: data.value
      }
    })
  }

  handleToggleAvailable(e, data) {
    const { product } = this.state
    this.setState({
      product: {
        ...product,
        [data.name]: data.checked
      }
    })
  }

  savaData() {
    const { AuthStr, product: { available, page, price, discount, img, url, pageDescr, pageFeautures, pageFunctions, category, title, label } } = this.state
    const { match: { params: { id } } } = this.props
    const feautures = pageFeautures.split('\n')
    .filter(v => {
      const value = v.trim()
      return value ? true : false
    }).map(string => {
      const [key, value] = string.split('__')
      return {
        key: key.trim(),
        value: value.trim()
      }
    })
    const functions = pageFunctions.split('\n\n').filter(v => {
      const value = v.trim()
      return value ? true : false
    }).map(string => {
      const [group, list] = string.split('__\n')
      const n_list = list.split('||').filter(v => {
        const list = v.trim()
        return list ? true : false
      }).map(string => string.trim() )
      return {
        group: group.trim(),
        list: n_list
      }
    })

    const new_product = {
      title,
      available,
      price: price * 1,
      discount: discount/100,
      category,
      img,
      label: label.trim(),
      page: {
        ...page,
        descr: pageDescr,
        feautures,
        functions,
      }
    }
    if (url) new_product.url = url

    if(id === 'new') {
      console.log('new', new_product)
      axios.post(`${API_URL}/products/`, new_product, { headers: { Authorization: AuthStr } }).then(({ data: { success, data } }) => {
        if (success) {
          console.log(data)
          this.props.history.push('/__adm/products')
        }
      }, (err) => {
        console.log(err)
      })
    } else {
      console.log('update', new_product, id)
      axios.patch(`${API_URL}/products/${id}`, new_product, { headers: { Authorization: AuthStr } }).then(({ data: { success } }) => {
        if (success) {
          this.props.history.push('/__adm/products')
        }
      }, (err) => {
        console.log(err)
      })
    }
  }
  
  render() {
    const { product, isLoading, currency, categories } = this.state

    if(!product) {
      if(isLoading) {
        return <Segment style={{ padding: '50px' }}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      } else {
        return <List.Item>
          <List.Content>
            <List.Header>Пусто</List.Header>
          </List.Content>
        </List.Item>
      }
    }

    const price = round10(product.price * currency.USD);
    return (
      <AdminTemplate>
        <List divided relaxed>
            <List.Item key={product._id} style={ {padding: '20px 20px', border: '1px solid #ddd'} }>
                <List.Content>
                  <List.Header style={ {textAlign: 'center', marginBottom: '15px'} }>
                    {product.title} 
                  </List.Header>
                  <List.Description>
                    <Form>
                      <Form.Field>
                        <label>Назва</label>
                        <Input 
                          placeholder='Назва'
                          name='title'
                          value={product.title}
                          onChange={this.handleChangeProductProperty.bind(this)}
                        />
                      </Form.Field>
                      <Form.Field
                        control={Checkbox}
                        toggle 
                        name='available' 
                        label='В наявності' 
                        checked={product.available} 
                        onChange={this.handleToggleAvailable.bind(this)} 
                      />
                      <Form.Field>
                        <label>Ціна ({price} грн.)</label>
                        <Input 
                          label={{ basic: true, content: '$' }}
                          labelPosition='right'
                          placeholder='Ціна'
                          type='number'
                          step="0.1"
                          name='price'
                          value={product.price}
                          onChange={this.handleChangeProductProperty.bind(this)}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Знижка {product.discount > 0 && <span> ({Math.round(price * (1-(product.discount/100)))} грн.) </span>}</label>
                        <Input 
                          label={{ basic: true, content: '%' }}
                          labelPosition='right'
                          placeholder='Знижка'
                          type='number'
                          step="1"
                          name='discount'
                          value={product.discount}
                          onChange={this.handleChangeProductProperty.bind(this)}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Категорія</label>
                        <Select 
                          placeholder='Категорія' 
                          name='category'
                          options={categories} 
                          onChange={this.handleChangeProductProperty.bind(this)}
                          value={product.category}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Зображення</label>
                        <Input 
                          placeholder='Зображення'
                          name='img'
                          value={product.img}
                          onChange={this.handleChangeProductProperty.bind(this)}
                        />
                        <Image src={product.img} size='small' />
                      </Form.Field>
                      <Form.Field>
                        <label>Ярлик</label>
                        <Input 
                          placeholder='Ярлик'
                          name='label'
                          value={product.label}
                          onChange={this.handleChangeProductProperty.bind(this)}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Посилання на сторінку продукту (URL) <small>{window.location.origin}/products/:category/{product.url}</small></label>
                        <Input 
                          placeholder='Посилання на сторінку продукту'
                          name='url'
                          value={product.url}
                          onChange={this.handleChangeProductProperty.bind(this)}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Опис</label>
                        <TextArea 
                          placeholder='Опис'
                          name='pageDescr'
                          value={product.pageDescr}
                          onChange={this.handleChangeProductProperty.bind(this)}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Характеристики</label>
                        {/* <List divided relaxed>
                        {product.page.feautures.map(feauture => {
                          return <List.Item key={feauture.key}>{feauture.key} {feauture.value}</List.Item>
                        })}
                        </List> */}
                        <TextArea 
                          style={{minHeight: '150px'}}
                          placeholder={`feauture 1__yes\nfeauture 2__no\n`}
                          name='pageFeautures'
                          value={product.pageFeautures}
                          onChange={this.handleChangeProductProperty.bind(this)}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Функції</label>
                        <TextArea 
                          style={{minHeight: '150px'}}
                          placeholder={`GROUP 1__\nitem 1||\nitem 2||\n\nGROUP 2__\nitem 1||\nitem 2||\nitem 3||\n\n`}
                          name='pageFunctions'
                          value={product.pageFunctions}
                          onChange={this.handleChangeProductProperty.bind(this)}
                        />
                      </Form.Field>
                      <Form.Field style={{textAlign: 'right'}}>
                        <Button positive icon='checkmark' labelPosition='right' content='Зберегти' onClick={this.savaData.bind(this)} />
                      </Form.Field>
                      <br />
                      {/* <Form.Select label='Status' name='status' options={statusOption} placeholder='Status' defaultValue={status} onChange={this.handleChange} />
                      <Form.TextArea label='Info' name='_info' value={_info} onChange={this.handleChange} /> */}
                    </Form>
                    
                    {/* <Grid columns={1} divided stackable>
                      <Grid.Row>
                        <Grid.Column>
                          <Item.Group divided>
                            
                          </Item.Group>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid> */}
                  </List.Description>
                </List.Content>
              </List.Item>
        </List>
      </AdminTemplate>
    )
  }
}

export async function getServerSideProps(content) {
  const {productId} = content.query;
  return {props: {productId}}
}

export default withRouter(ProductEditor)
