import React, { Component } from 'react';
import { List, Item, Grid, Icon, Button, Image, Checkbox, Label, Form, Input } from 'semantic-ui-react';
import axios from 'axios';
import _ from "lodash";
import moment from 'moment';
import { withRouter } from 'next/router'

import AdminTemplate from '../../components/Admin/AdminTemplate'
import { Loader } from '../../components'
import {API_URL} from "../../constants";

class ProductList extends Component {

  state = { products: [], isLoading: true, search: '' }
  currencyInput = React.createRef();

  componentDidMount() {
    const token = localStorage.getItem('access_token') || ''
    const AuthStr = 'Bearer '.concat(token)
    this.setState({ AuthStr })
    axios.get(`${API_URL}/products`, { headers: { Authorization: AuthStr } }).then(({ data: { success, data, currency } }) => {
      if (success) {
        this.setState({ products: data, isLoading: false, currency })
      }
    }, (err) => {
      console.log(err)
      this.setState({ products: [], isLoading: false })
    })
  }

  handleToggleAvailable(e, data) {
    const checked = data.checked;
    const productID = data.product_id;
    const { products, AuthStr } = this.state
    axios.patch(`${API_URL}/products/${productID}`, { available: checked }, { headers: { Authorization: AuthStr } }).then(({ data: { success, data } }) => {
      if (success) {
        const updated_products = products.map(product => product._id === productID ? {...product, available: checked} : product)
        this.setState({
          products: updated_products
        })
      }
    }, (err) => {
      console.log(err)
    })
  }

  handleTogglePreOrder(e, data) {
    console.log('handleTogglePreOrder')
    const checked = data.checked;
    const productID = data.product_id;
    const { products, AuthStr } = this.state
    axios.patch(`${API_URL}/products/${productID}`, { preOrder: checked }, { headers: { Authorization: AuthStr } }).then(({ data: { success, data } }) => {
      if (success) {
        const updated_products = products.map(product => product._id === productID ? {...product, preOrder: checked} : product)
        this.setState({
          products: updated_products
        })
      }
    }, (err) => {
      console.log(err)
    })
  }

  redirect = (page) => {
    this.props.router.push(page)
  }

  saveCurrency() {
    if(!this.currencyInput.current.value) return;
    
    const { AuthStr } = this.state
    const USD = parseFloat(this.currencyInput.current.value);
    this.setState({ isLoadingChangeCourse: true })
    axios.post(`${API_URL}/products/setUSD`, { USD }, { headers: { Authorization: AuthStr } }).then(({ data: { success, USD } }) => {
      if (success) {
        this.setState({ currency: { USD }, })
        axios.get(`${API_URL}/products`, { headers: { Authorization: AuthStr } }).then(({ data: { success, data, currency } }) => {
          if (success) {
            this.setState({ products: data, isLoading: false, currency, isLoadingChangeCourse: false })
          }
        }, (err) => {
          console.log(err)
          this.setState({ products: [], isLoading: false })
        })
      }
    }, (err) => {
      console.log(err)
    })
  }

  removeProduct(_id) {
    const { products, AuthStr } = this.state;
    axios.delete(`${API_URL}/products/${_id}`, { headers: { Authorization: AuthStr } }).then(({ data: { success } }) => {
      if (success) {
        this.setState({
          products: products.filter(p => p._id !== _id)
        })
      }
    }, (err) => {
      console.log(err)
    })
  }

  handleSearch = _.debounce((_, {value}) => {
    this.setState({search : value})
  }, 250)

  render() {
    const { isLoading, isLoadingChangeCourse, currency = {}, search } = this.state
    const products = !search ? this.state.products : this.state.products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    return (
      <AdminTemplate>
        <List divided relaxed>
          <List.Item key='action_block' style={ {padding: '20px 20px', border: '1px solid #ddd'} }>
            <Button basic color='teal' style={{marginBottom: '8px', marginRight: '8px'}} onClick={() => this.redirect('/admin/edit-product/new')}><Icon name='plus' /> Додати продукцію</Button>
            <Form style={{display: 'initial'}}>
              <Input labelPosition='right' type='text' placeholder='Курс' style={{marginBottom: '8px', marginRight: '8px'}}>
                <Label basic>$</Label>
                <input ref={this.currencyInput} defaultValue={currency.USD} style={{width: '80px'}} />
                <Label as={Button} color='teal' onClick={() => this.saveCurrency()} loading={isLoadingChangeCourse}>Зберегти</Label>
              </Input>
            </Form>
            <Input
              icon='search'
              name='handleSearch'
              placeholder='Пошук...'
              onChange={ this.handleSearch } />
          </List.Item>
          <Loader isLoading={isLoading}>
          { products.length > 0
            ? products.map(product => (
              <List.Item key={product._id} style={ {padding: '20px 20px', border: '1px solid #ddd'} }>
                <List.Content>
                  <List.Header style={ {textAlign: 'center', marginBottom: '15px'} }>
                    {product.title}
                    {/* <Editor trigger={<Icon name='edit' style={{cursor: 'pointer', marginLeft: '8px'}} />} product={product} />  */}
                    <Icon name='edit' style={{cursor: 'pointer', marginLeft: '8px'}} onClick={() => this.redirect(`/admin/edit-product/${product._id}`) } />
                    <a href={`/products/${product.category.key}/${product.url}`} target='_blank' rel="noopener noreferrer"><Icon name='linkify' style={{cursor: 'pointer', marginLeft: '8px'}} /></a>
                    &nbsp;&nbsp;
                    <Icon name='trash' color='red' style={{cursor: 'pointer', marginLeft: '8px'}} onClick={() => this.removeProduct(product._id) } />
                  </List.Header>
                  <List.Description>
                    <Grid columns={2} stackable>
                      <Grid.Row>
                        <Grid.Column>
                          <Item.Group divided>
                            <Image src={product.img} size='medium' className='productImage' />
                          </Item.Group>
                        </Grid.Column>
                        <Grid.Column>
                          <List divided relaxed>
                            <List.Item>
                              <List.Content>
                                <List.Header>
                                  {/* В наявності: {product.available ? 'Да': 'Нет'} */}
                                  <Checkbox toggle name='available' label='В наявності' product_id={product._id} checked={product.available} onChange={this.handleToggleAvailable.bind(this)} />
                                </List.Header>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header>
                                  {/* В наявності: {product.available ? 'Да': 'Нет'} */}
                                  <Checkbox toggle name='preOrder' label='Попереднє замовлення' product_id={product._id} checked={product.preOrder} onChange={this.handleTogglePreOrder.bind(this)} />
                                </List.Header>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header>Ціна: {product.price}$ ({product.priceUAH}грн.)</List.Header>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header>Знижка: {Math.round(product.discount * 100)}%</List.Header>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header>Категорія: {product.category.key}</List.Header>
                              </List.Content>
                            </List.Item>
                            {/* <List.Item>
                              <List.Content>
                                <List.Header>Зображення: {product.img}</List.Header>
                              </List.Content>
                            </List.Item> */}
                            <List.Item>
                              <List.Content>
                                <List.Header>Створено: {moment(product.createdAt).format('DD.MM.YYYY HH:mm:ss')}</List.Header>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header>Оновлено: {moment(product.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</List.Header>
                              </List.Content>
                            </List.Item>
                          </List>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </List.Description>
                </List.Content>
              </List.Item>
            ))
            : <List.Item>
                <List.Content>
                  <List.Header>Пусто</List.Header>
                </List.Content>
              </List.Item>
          }
          </Loader>
        </List>
      </AdminTemplate>
    )
  }
}


export default withRouter(ProductList)
