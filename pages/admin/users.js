import React, { useState, useEffect } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import AdminTemplate from '../../components/Admin/AdminTemplate'
import { Loader } from '../../components'
import axios from 'axios'
import {API_URL} from '../../constants'
import userRoles from '../../helpers/userRoles'

const Users = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('access_token') || ''
    const AuthStr = 'Bearer '.concat(token)

    axios.get(`${API_URL}/users`, { headers: { Authorization: AuthStr } }).then(({ data: { success, data } }) => {
      if (success) {
        setUsers(data)
      }
      setIsLoading(false);
    }, (err) => {
      console.log(err)
      setIsLoading(false);
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminTemplate>
      <Loader isLoading={isLoading}>
      {
        users.map(user => {
          return (
            
              <Segment color='brown' key={user._id}>
                <Grid columns='equal' stackable>
                  <Grid.Column>
                    Користувач: <b>{user.firstName} {user.lastName}</b>
                  </Grid.Column>
                  <Grid.Column>
                    Email: <b>{user.email}</b>
                  </Grid.Column>
                  <Grid.Column>
                    Роль: {userRoles({ role: user.role })}
                  </Grid.Column>
                </Grid>
              </Segment>
          )
        })
      }
      </Loader>
    </AdminTemplate>
  )
}

export default Users
