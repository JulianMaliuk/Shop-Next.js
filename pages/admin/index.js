import React from 'react'
import { Grid, Card } from 'semantic-ui-react'

import { AdminTemplate, PrivateRoute } from '../../components/Admin'

const Admin = () => {
  return (
    <PrivateRoute>
      <AdminTemplate>
        {/* <Grid stackable style={{ padding: '100px 0' }}>
          <Grid.Row columns={4} textAlign='center'>
            <Grid.Column>
              <Card fluid color='orange' header='Замовлення' />
            </Grid.Column>
            <Grid.Column>
              <Card fluid color='orange' header='Продукція' />
            </Grid.Column>
            <Grid.Column>
              <Card fluid color='orange' header='Користувачі' />
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid> */}
      </AdminTemplate>
    </PrivateRoute>
  )
}

export default Admin
