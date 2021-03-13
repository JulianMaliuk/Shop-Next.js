import React from 'react'
import { Grid, Header, Icon, List } from 'semantic-ui-react';
import { SITE_URL } from '../../constants'

const Footer = () => {
  return (
    <>
      <Grid columns={3} divided stackable className='footer'>
        <Grid.Row>
          <Grid.Column>
            <div>
              <Header as='h5' icon textAlign='center'>
                <Icon name='phone' circular />
                <Header.Content>Контакти</Header.Content>
              </Header>
            </div>
            <div className='content'>
              <Icon name='phone' /> (067) 628-18-77 <br /><br />
              <Icon name='calendar alternate outline' /> пн-пт 8:00-19:00
              <br />
              <br />
              <Icon name='mail' />magnumgsm2021@gmail.com
            </div>
          </Grid.Column>
          <Grid.Column>
            <div>
              <Header as='h5' icon textAlign='center'>
                <Icon name='dollar' circular />
                <Header.Content>Оплата</Header.Content>
              </Header>
            </div>
            <div className='content'>
              <List bulleted>
                <List.Item>Форма та порядок оплати узгоджується з менеджером після Вашого замовлення</List.Item>
                <List.Item>
                  <em>Продаж здійснюється офіційним представником виробника ФОП Іванченко А.Г.</em><br />
                  <a href='https://magnum.com.ua/contract-offer-magnum.com.ua.pdf' target='_blank'>Публічний договір - оферта</a>
                </List.Item>
                <img src={`${SITE_URL}/images/visa-mastercard.png`} style={{maxHeight: '35px', marginTop: '10px'}} />
              </List>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div>
              <Header as='h5' icon textAlign='center'>
                <Icon name='bus' circular />
                <Header.Content>Доставка</Header.Content>
              </Header>
            </div>
            <div className='content'>
              <List bulleted>
                <List.Item>Нова Пошта</List.Item>
              </List>
              (Безкоштовна доставка при придбанні охоронних систем, або при замовленні на суму більше 3000 грн.)
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} textAlign='center'>
          <Grid.Column>
            Created by <a href='mailto:Julian.maljuk@gmail.com'>Julian Maliuk</a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <style jsx>{`
        .ui.divided.three.column.grid.footer {
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          padding-bottom: 30px;
        }
        .ui.divided.three.column.grid.footer .content {
          text-align: center;
        }
      `}</style>
    </>
  )
}

export default Footer