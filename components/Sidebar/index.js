import React from 'react'
import { Menu, Embed, Card } from 'semantic-ui-react'
import Search from '../Search'

const Sidebar = () => {
  return (
    <Menu vertical>
      <Menu.Item>
        <Search />
      </Menu.Item>

      <Menu.Item>
        <a href='https://integrator.tecel.ru/devices/1979' target='_blank' rel="noopener noreferrer">
          <Card fluid color='red' header='CANTEC 2XL' description='Інтегратор (перевірка підтримки автомобіля)' meta='' image={`/images/can-integrator.jpg`} />
        </a>
      </Menu.Item>

      <Menu.Item>
        <a href='https://can.starline.ru/34/' target='_blank' rel="noopener noreferrer">
          <Card fluid color='red' header='SIGMA 10/15' description='Інтегратор (перевірка підтримки автомобіля)' meta='' image={`/images/can-integrator.jpg`} />
        </a>
      </Menu.Item>

      <Menu.Item>
        <Embed
          autoplay={false}
          id='k7PGjadmWic'
          iframe={{
            allowFullScreen: true,
            style: {
              padding: 0,
            },
          }}
          placeholder={`/uploads/images/products/Magnum-Smart-S80-CAN.jpg`}
          source='youtube'
        /><br />
        Огляд автосигналізації Magnum серії Smart M10-S80 від Avtozvuk.ua
      </Menu.Item>
      <Menu.Item>
        <Embed
          autoplay={false}
          id='hXKUVbAcGIY'
          iframe={{
            allowFullScreen: true,
            style: {
              padding: 0,
            },
          }}
          placeholder={`/uploads/images/products/Magnum-Smart-S80-CAN.jpg`}
          source='youtube'
        /><br />
        Розпакування Автосигналізації Magnum sMart S10+CAN від Avtozvuk.ua
      </Menu.Item>
    </Menu>
  )
}

export default Sidebar