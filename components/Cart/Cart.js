import React from 'react'
import { Icon, Item, Modal, Label, Button, Header, Menu } from 'semantic-ui-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {SITE_URL} from "../../constants";

import { useDispatch } from 'react-redux';
import { setIsOpenCart } from '../../redux/reducers/cart'

export default function Cart({cart, total, removeFromCart, setCount, isOpenCart}) {
  const dispatch = useDispatch();
  const router = useRouter()
  return <Modal closeIcon open={isOpenCart} onClose={() => dispatch(setIsOpenCart(false))}>
    <Modal.Header><Icon name='cart' size='big' color='green' /> Кошик</Modal.Header>
      <Modal.Content >
        <Item.Group divided>
          {cart.length > 0 
          ? (cart.map(item => {
            const discount = (item.discount && item.discount > 0) ? (1-item.discount) : 1
            return <Item key={item.id}>
              <Item.Image size='small' src={SITE_URL + item.img} />
              <Item.Content verticalAlign='middle'>
                <h3>{item.title}</h3>
                <Label color='orange' tag>{Math.round(item.priceUAH * discount)} грн</Label>
                <Label>Кількість: {item.count}</Label> {item.preOrder && <Label color='red' horizontal>Попереднє замовлення</Label>}
                <Item.Extra>
                  <Button icon size='tiny' disabled={item.count < 2} onClick={() => setCount({id: item.id, count: item.count - 1})} >
                    <Icon name='minus' />
                  </Button>
                  <Button icon size='tiny' onClick={() => setCount({id: item.id, count: item.count + 1})} >
                    <Icon name='plus' />
                  </Button>
                  <Button icon floated='right' size='tiny' color='red' onClick={() => removeFromCart(item.id)} >
                    <Icon name='remove' />
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>      
          })
          )
          : <Header as='h1' disabled textAlign='center'>Немає товарів в кошику</Header>}
        </Item.Group>
      </Modal.Content>
      { cart.length > 0 && <Modal.Content style={{textAlign: 'right'}}>
        <h3>Разом: { total } грн</h3>
        <Link href='/checkout'><a></a></Link>
        <Button 
          size='medium' 
          color='green' 
          onClick={() => {
            dispatch(setIsOpenCart(false))
            router.push('/checkout')
          }}
        > 
          Оформити замовлення 
        </Button>
      </Modal.Content>}
  </Modal>
}