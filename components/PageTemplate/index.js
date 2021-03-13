import React from 'react';
import { Container, Divider } from 'semantic-ui-react'
import { Footer, Header } from '..'
import Head from 'next/head'

const PageTemplate = ({children}) => (
  <Container>
    <Head>
      <title>Магазин продукції Magnum</title>
      <meta name="description"                   content="Сигналізації Magnum серії I/Smart/Elite | управління з Android, iOS | автоматичний і дистанційний запуск двигуна | місцезнаходження автомобіля по GPS і LBS | режим Трекінг | кодовий іммобілайзер | підтримка CAN" />
      <meta name="author"                        content="Julian Maliuk, Julian.maljuk@gmail.com"/>
      <meta property="og:title"                  content="Сигналізації Magnum серії I/Smart/Elite | управління з Android, iOS | автоматичний і дистанційний запуск двигуна | місцезнаходження автомобіля по GPS і LBS | режим Трекінг | кодовий іммобілайзер | підтримка CAN" />
      <meta property="og:url"                    content="https://shop.magnum.com.ua" />
      <meta property="og:description"            content="Сигналізації Magnum серії I/Smart/Elite | управління з Android, iOS | автоматичний і дистанційний запуск двигуна | місцезнаходження автомобіля по GPS і LBS | режим Трекінг | кодовий іммобілайзер | підтримка CAN" />
      <meta property="og:image"                  content="https://shop.magnum.com.ua/favicon.png" />
      <meta property="og:site_name"              content="Shop Magnum" />
    </Head>
    <Header />
    <Container>
      {children}
      <Divider />
      <Footer />
    </Container>
  </Container>
)

export default PageTemplate
