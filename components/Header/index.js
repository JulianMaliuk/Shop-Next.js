import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';

import Cart from '../Cart'
import { selectCart, setIsOpenCart } from '../../redux/reducers/cart'

const Header = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  return <>
    <Menu size='small' stackable className='main'>
      <Link href='/products/all'>
        <Menu.Item as='a' href='/products/all' >
          <Icon name='shopping basket' color='red' size='huge' />
              <h3 style={{margin: 0}}>Продукція Magnum</h3>
          </Menu.Item>
      </Link>
      <Menu.Menu position='right'>
        <Menu.Item style={{fontSize: '1.6rem'}}>
          <Icon name='phone' /> 
          Контакти:<br />
          (067) 628-18-77
        </Menu.Item> 

        <Menu.Item onClick={() => dispatch(setIsOpenCart(true))}>
            <Icon name='cart' size='big' color='green' />
            <span style={{fontSize: '1.3rem'}}>{cart.length > 0 && `(${cart.length})`}</span>
        </Menu.Item>

        <Cart />
      </Menu.Menu>
    </Menu>
    <style jsx global>{`
      .ui.small.stackable.main.menu {
        margin-top: 10px;
      }
      .ui.small.stackable.main.menu .item {
        height: 100px;
      }

      .ui.small.stackable.main.menu .item:before {
        width: 0 !important;
      }

      @media (max-width: 768px) {
        .ui.small.stackable.main.menu .item {
          height: inherit;
        }
        .ui.stackable.menu .right.menu .item {
          width: auto !important;
          margin: auto;
          text-align: center;
        }
      }
    `}</style>
  </>
}

export default Header