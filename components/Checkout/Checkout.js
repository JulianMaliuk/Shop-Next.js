import React, { Component } from 'react'
import { Form, Divider, Grid, Item, Message, Loader, Select } from 'semantic-ui-react'
import {API_URL} from '../../constants'
import axios from 'axios'
import { withRouter } from 'next/router'

import { find as _find } from 'lodash';

class Checkout extends Component {
  state = {
    order: {},
    user: {},
    selected_region: null,
    cities: [],
    selected_city: null,
    offices: [],
    selected_office: null,
    requiredErr: false,
    cart: this.props.cart,
    promocode: '',
  }

  componentDidMount() {
    const { fetchRegions, cart, updateCartByID } = this.props;
    fetchRegions()
    cart.forEach(product => {
      axios.get(`${API_URL}/products/${product._id}`).then(({ data: { success, data } }) => {
        if (success) updateCartByID({id: data._id, product: data})
      }, (err) => console.log(err))
    })
  }

  onSelectRegion(e, { value }) {
    const { delivery: { regions,  cities }, setRegion, fetchCities } = this.props
    const title = _find(regions, { value }).text
    setRegion(title)
    fetchCities(value)
  }

  onSelectCity(e, { value }) {
    const { delivery: { cities }, setCity, fetchOffices} = this.props
    const title = _find(cities, { value }).text
    setCity(title)
    fetchOffices(value)
  }

  onSelectOffice(e, { value }) {
    const { delivery: { offices }, setOffice } = this.props
    const title = _find(offices, { value }).text
    setOffice(title)
  }

  submitOrder() {
    const { user: { name, phone, email }, promocode } = this.state
    const { delivery: { region, city, office }, router } = this.props
    if(name && phone && email && region && city && office) {
      this.setState({requiredErr: false, isCreatingOrder: true})
      const products = this.props.cart.map(({ count, id }) => ({ item: id, count: count }))

      axios.post(`${API_URL}/orders`, {
        products,
        user: { name, phone, email },
        delivery: {
          region,
          city,
          office,
        },
        promocode,
      }).then(({ data: { success, data } }) => {
        if(success) {
          this.props.cleanCart();
          router.push(`/order-created/${data._id}`)
        }
      })
    }
    else {
      this.setState({requiredErr: true})
    }
  }

  onSubmitPromoCode() {
    console.log('onSubmitPromoCode');
  }

  render() {
    const deliveryOptions = [
      { key: 'nova_poshta', value: 'nova_poshta', text: '?????????? ??????????' }
    ]

    const { delivery: { regions, cities, offices }, cart } = this.props
    const { requiredErr, isCreatingOrder } = this.state

    return <Grid stackable>
        <Grid.Column width={10}>
          <Form error={requiredErr} style={{maxWidth: '350px', margin: '0 auto', marginBottom: '50px'}} onSubmit={this.submitOrder.bind(this)} >
          <Divider horizontal>?????????????????? ????????</Divider>
          <Form.Field required>
            <label>????'?? ???? ????????????????</label>
            <Form.Input type='text' placeholder={'????\'?? ???? ????????????????'} required onChange={(e, data) => this.setState({user: {...this.state.user, name: data.value}})} />
          </Form.Field>
          <Form.Field required>
            <label>?????????? ????????????????</label>
            <Form.Input type='tel' placeholder='?????????? ????????????????' required onChange={(e, data) => this.setState({user: {...this.state.user, phone: data.value}})} />
          </Form.Field>
          <Form.Field required>
            <label>E-mail</label>
            <Form.Input type='email' placeholder='E-mail' required onChange={(e, data) => this.setState({user: {...this.state.user, email: data.value}})} />
          </Form.Field>
          
          <Divider horizontal>????????????</Divider>

          <Form.Field>
            <label>???????????????? (???? ??????????????????)</label>
            <Form.Input 
              type='text' 
              placeholder='????????????????' 
              onChange={(e, data) => this.setState({promocode: data.value})}
              action={{
                labelPosition: 'right',
                icon: 'check',
                content: '??????????????????????',
                onClick: () => this.onSubmitPromoCode(),
              }}
                />
          </Form.Field>

          <Divider horizontal>????????????????</Divider>

          <Form.Field 
            control={Select} 
            selection 
            label='?????????????? ????????????????' 
            placeholder='?????????????? ?????????????? ????????????????' 
            options={deliveryOptions} 
            defaultValue={deliveryOptions[0].value}
            required 
          />

          {regions && 
            <Form.Field 
              control={Select}
              search
              selection
              label='??????????????' 
              placeholder='?????????????? ??????????????' 
              options={regions} 
              onChange={this.onSelectRegion.bind(this)} 
              required 
          />}

          <Form.Field 
            control={Select}
            search
            selection 
            label='??????????' 
            placeholder='?????????????? ??????????' 
            options={cities} 
            onChange={this.onSelectCity.bind(this)} 
            required 
          />

          <Form.Field 
            control={Select}
            search
            selection 
            label='????????????????????' 
            placeholder='?????????????? ????????????????????' 
            options={offices} 
            onChange={this.onSelectOffice.bind(this)} 
            required 
          />

          <Message
            error
            header={'?????????????????? ????????\'???????????? ????????!'}
          />

          <Form.Button type='submit' size='medium' color='green' >
            ???????????????? ????????????????????
          </Form.Button>

          { isCreatingOrder && <Loader active inline="centered" content="" /> }
        </Form>
      </Grid.Column>
      <Grid.Column width={6}>
        <Item.Group divided>
          {cart && cart.map(product => (
            <Item key={product.id}>
              <Item.Image size='tiny' src={product.img} />
              <Item.Content verticalAlign='middle'>{product.title} ({product.count})</Item.Content>
            </Item>
          ))}
        </Item.Group>
        {cart && <div style={{textAlign: 'right'}}>
          <h3>??????????: {Math.round(cart.reduce((total, product) => total + (product.priceUAH * ((product.discount && product.discount > 0) ? (1-product.discount) : 1) * product.count), 0))}??????</h3>
        </div>}
      </Grid.Column>
    </Grid>
  }
}

export default withRouter(Checkout)
