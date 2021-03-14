import React, { useRef, useEffect, useState } from 'react';
import { Menu, Container, Grid, Icon, Sticky, Ref } from 'semantic-ui-react'
import { withRouter, useRouter } from 'next/router'
import useWindowDimensions from '../../helpers/useWindowDimensions'
import Link from 'next/link'

const AdminTemplate = ({ children }) => {
  const router = useRouter()
  const path = router.pathname;
  const menuElem = useRef(null);
  const { width } = useWindowDimensions()
  
  return (
    <Container fluid>
      <Menu stackable>
        <Menu.Item>
          <Icon name='shopping basket' color='red' size='big' />
          <h3 style={{margin: 0}}>ADMIN PANEL</h3>
        </Menu.Item>
        <Link href='/'>
          <Menu.Item as='a' href='/' target='_blank' rel="noopener noreferrer" position='right'>
            <p style={{margin: 0}}>до магазину</p>
          </Menu.Item>
        </Link>
      </Menu>
      <Ref innerRef={menuElem}>
        <Grid celled stackable columns='equal'>
          <Grid.Row>
            <Grid.Column tablet={5} computer={4}>
              <Sticky context={menuElem} offset={10} scrollContext={width >= 768 ? globalThis: null}>
                <Menu vertical icon fluid color='red' stackable className='' pointing>
                  <Link href='/admin/orders'>
                    <Menu.Item as='a' href='/admin/orders' name='Замовлення' active={path === '/admin/orders'} />
                  </Link>
                  <Link href='/admin/products'>
                    <Menu.Item as='a' href='/admin/products' name='Продукція' active={path === '/admin/products'} />
                  </Link>
                  <Link href='/admin/users'>
                    <Menu.Item as='a' href='/admin/users' name='Користувачі' active={path === '/admin/users'} />
                  </Link>
                  <Menu.Item name='Редактор' active={path === '/admin/edit-product/[productId]'} disabled ></Menu.Item>
                </Menu>
              </Sticky>
            </Grid.Column>
            <Grid.Column>
              {children}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Ref>
    </Container>
  )
}

export default withRouter(AdminTemplate)