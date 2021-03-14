import React, { useEffect, useState } from 'react'
import { Grid, Card, Icon, Label, Popup } from 'semantic-ui-react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { AdminTemplate, PrivateRoute } from '../../components/Admin'
import { API_URL } from '../../constants'

const Admin = () => {
  const [state, setState] = useState({})
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('access_token') || ''
    const AuthStr = 'Bearer '.concat(token)

    async function fetchData() {
      axios.get(`${API_URL}/summary`, { headers: { Authorization: AuthStr } })
        .then(({ data }) => {
          setState({ ...data })
        }, (err) => {})
    }

    fetchData()
  }, [])

  return (
    <PrivateRoute>
      <AdminTemplate>
        <Grid stackable style={{ paddingBottom: '300px' }}>
          <Grid.Row columns={3} textAlign='center'>
            <Grid.Column>
              <Card fluid color='orange' onClick={() => router.push('/admin/orders')}>
                <Card.Header>
                  <h4>Замовлення</h4>
                </Card.Header>
                <Card.Content>
                  <Icon name='shopping cart' size='big' color='orange' />
                  <span>{state.ordersCount}</span>
                </Card.Content>
                <Card.Description>
                <Popup content='Виконано' trigger={<Label color='green' content={state.ordersDone} />} />
                <Popup content='Створено' trigger={<Label color='blue' content={state.ordersCreated} />} />
                <Popup content='Скасовано' trigger={<Label color='red' content={state.ordersCancelled} />} />
                </Card.Description>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid color='teal' onClick={() => router.push('/admin/products')}>
                <Card.Header>
                  <h4>Продукція</h4>
                </Card.Header>
                <Card.Content>
                  <Icon name='list alternate outline' size='big' color='teal' />
                  <span>{state.productsCount}</span>
                </Card.Content>
                <Card.Description>
                  <Popup content='В наявності' trigger={<Label color='green' content={state.productsAvailable} />} />
                  <Popup content='Попереднє замовлення' trigger={<Label color='red' content={state.productsPreOrder} />} />
                </Card.Description>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid color='olive' onClick={() => router.push('/admin/users')}>
                <Card.Header>
                  <h4>Користувачі</h4>   
                </Card.Header>
                <Card.Content>
                  <Icon name='user' size='big' color='olive' />
                  <span>{state.usersCount}</span>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <style jsx global>{`
          .card>.header {
            padding: 20px 0
          }
          .card>.content>span {
            font-size: 35px;
            vertical-align: middle;
          }
          .card>.description {
            padding: 10px
          }
        `}</style>
      </AdminTemplate>
    </PrivateRoute>
  )
}

export default Admin
