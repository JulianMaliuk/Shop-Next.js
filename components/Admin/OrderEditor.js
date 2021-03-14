import React, { useReducer } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { getStatusMeta } from '../../helpers/orderStatus'
import {API_URL} from "../../constants";
import _ from 'lodash'

function reducer(state, action) {
  switch (action.type) {
    case 'setOrder': return { ...state, order: action.payload };
    case 'setModal': return { ...state, open: action.payload };
    default: throw new Error();
  }
}

function init(props) {
  const { order: { status, _info, delivery, user, total } } = props
  return { open: undefined, order: { status, _info, delivery, user, total } }
}

const OrderEditor = (props) => {
  const [state, dispatch] = useReducer(reducer, props, init);

  const handleChange = (e, { name, value }) => {
    const order = {...state.order}
    _.set(order, name, value)
    dispatch({ type: 'setOrder', payload: order })
  }

  const saveData = () => {
    const { order: { _id }, onChangeProperty } = props
    const token = localStorage.getItem('access_token') || ''
    const AuthStr = 'Bearer '.concat(token)

    axios.patch(`${API_URL}/orders/${_id}`, {...state.order}, { headers: { Authorization: AuthStr } }).then(({ data: { success, data } }) => {
      if (success) {
        onChangeProperty({_id: data._id, data});
        dispatch({ type: 'setModal', payload: null })
        dispatch({ type: 'setModal', payload: undefined })
      }
    }, (err) => {
      console.log(err)
    })
  }

  const { order: { orderId }, trigger } = props
  const { status, _info, delivery: {region, city, office}, user: {name, phone, email}, total } = state.order
  let statusOption = ['done', 'created', 'paid', 'sent', 'cancelled']
    .map(item => ({ key: item, text: getStatusMeta({ key: item }).text, value: item }))

  return (
    <Modal trigger={trigger} open={state.open}>
      <Modal.Header>Заказ №{orderId}</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Form>
            <Form.Select label='Status' name='status' options={statusOption} placeholder='Status' defaultValue={status} onChange={handleChange} />
            <Form.Input label='Ціна (разом)' name='total' value={total} onChange={handleChange} />
            <Form.TextArea label='Info' name='_info' value={_info} onChange={handleChange} />
            <Form.Input label='Область' name='delivery.region' value={region} onChange={handleChange} />
            <Form.Input label='Місто' name='delivery.city' value={city} onChange={handleChange} />
            <Form.Input label='Відділення' name='delivery.office' value={office} onChange={handleChange} />
            <Form.Input label={`Ім'я`} name='user.name' value={name} onChange={handleChange} />
            <Form.Input label='Номер телефону' name='user.phone' value={phone} onChange={handleChange} />
            <Form.Input label='Електронна пошта' name='user.email' value={email} onChange={handleChange} />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button positive icon='checkmark' labelPosition='right' content='Зберегти' onClick={saveData} />
      </Modal.Actions>
    </Modal>
  )
}

export default OrderEditor
