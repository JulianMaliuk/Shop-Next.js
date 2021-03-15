import React from 'react';
import { Grid, Menu } from 'semantic-ui-react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'

import { Sidebar, PageTemplate } from '../../components'
import ProductList from '../../components/ProductList'
import Filter from '../../components/Filter'
import { API_HOST, API_URL } from '../../constants';

const Products = ({ host, category, fromServer }) => {
  const router = useRouter()
  const currentURL = host + router.asPath
  const og = {};
  switch(category) {
    case 'car-alarm':
      og.title = 'Автосигналізації Magnum'; 
      og.img = 'https://shop.magnum.com.ua/images/products/Magnum-sMart-M10.jpg'; break
    case 'trackers':
      og.title = 'Трекери Magnum'; 
      og.img = 'https://shop.magnum.com.ua/images/products/Magnum-MT500S.jpg'; break
    case 'add-quipment':
      og.title = 'Додаткове обладнання Magnum'; 
      og.img = 'https://shop.magnum.com.ua/images/products/Magnum-TX-72.jpg'; break
    default: 
      og.title = 'Сигналізації Magnum серії I/Smart/Elite | управління з Android, iOS | автоматичний і дистанційний запуск двигуна | місцезнаходження автомобіля по GPS і LBS | режим Трекінг | кодовий іммобілайзер | підтримка CAN'; 
      og.img = 'https://shop.magnum.com.ua/images/products/Magnum-sMart-M10.jpg'; break
  }

  return (
    <PageTemplate>
      <Head>
        <title key="title">{og.title}</title>
        <meta key="description" name="description"              content={og.title} />
        <meta key="og:url" property="og:url"                    content={currentURL} />
        <meta key="og:description" property="og:description"    content={og.title} />
        <meta key="og:image" property="og:image"                content={og.img} />
        <meta key="og:site_name" property="og:site_name"        content="Shop Magnum" />
      </Head>
      <Menu pointing secondary fluid widths={5} color='red' stackable className='product-category-menu'>
        <Link href='/products/all'>
          <Menu.Item as='a' href='/products/all' name='Все' active={category === 'all'} />
        </Link>
        <Link href='/products/car-alarm'>
          <Menu.Item as='a' href='/products/car-alarm' name='Автосигналізації' active={category === 'car-alarm'} />
        </Link>
        <Link href='/products/trackers'>
          <Menu.Item as='a' href='/products/trackers' name='Трекери' active={category === 'trackers'} />
        </Link>
        <Link href='/products/add-quipment'>
          <Menu.Item as='a' href='/products/add-quipment' name='Додаткове обладнання' active={category === 'add-quipment'} />
        </Link>
      </Menu>
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column floated='right' mobile={16} tablet={10} computer={12}>
            <ProductList fromServer={fromServer} currentURL={currentURL} host={host} />
          </Grid.Column>
          <Grid.Column floated='left'>
            <Sidebar />
            <Filter category={category} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </PageTemplate>
  )
}

export default Products

export async function getServerSideProps({ req, query }) {
  const { category } = query;
  const host = req ? req.headers.host : location.hostname;

  const { data: { currency, data, categories } } = await axios.get(`${API_HOST}${API_URL}/products`)
  if(!data) return []
  const products = data.map(o => ({ ...o, id: o._id }))

  return {
    props: {
      host,
      category,
      fromServer: {products, categories, currency}
    },
  }
}