import React, { Component } from 'react'
import { Form, Header, Icon, Message } from 'semantic-ui-react'
import axios from 'axios';
import { withRouter } from 'next/router'
import {API_URL} from '../../constants'
import { PageTemplate } from '../../components'

class Auth extends Component {
  state = { email: '', password: '', err: null }

  handleChange = (e, { name, value }) => this.setState({ [name]: value, err: null })

  handleSubmit = () => {
    const { email, password } = this.state
    const { router } = this.props
    if(!email || !password) return this.setState({ err: 'чет не то :(' })

    axios.post(`${API_URL}/auth/signin`, { email, password }).then(({ data: { success, token } }) => {
      if (success) {
        localStorage.setItem('access_token', token)
        router.push('/admin')
      } else {
        return this.setState({ err: 'чет не то :(' })
      }
    }, (err) => {
      return this.setState({ err: 'чет не то :(' })
    })
  }

  render() {
    const { email, password, err } = this.state

    return (
      <PageTemplate>
        <Header as='h3' icon textAlign='center'>
          <Icon name='user circle' circular />
          <Header.Content>Автоизация</Header.Content>
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Form.Input label='E-mail' name='email' type='text' value={email} onChange={this.handleChange} placeholder='E-mail' />
          </Form.Field>
          <Form.Field>
            <Form.Input label='Password' name='password' type='password' value={password} onChange={this.handleChange} placeholder='password' />
          </Form.Field>
          { err && <Message negative>
            <Message.Header>{err}</Message.Header>
          </Message>}
          <Form.Button content='Submit' />
          </Form>

      </PageTemplate>
    )
  }
}

export default withRouter(Auth)
