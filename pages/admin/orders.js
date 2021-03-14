import React, { Component } from 'react';
import {List, Item, Grid, Label, Icon, Segment, Button, Select, Form} from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';
import { AdminTemplate, OrderEditor, OrderPrint } from '../../components/Admin'
import { Loader } from '../../components'
import {getStatusMeta, getAllMetaStatus} from '../../helpers/orderStatus'
import {API_URL} from "../../constants";

class OrderList extends Component {

  state = {
    orders: [],
    isLoading: true,
    isLoadingMore: false,
    currentPage: 1,
    pages: 1,
    selectStatus: '',
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = (page = 1) => {
    this.setState({
      isLoadingMore: page > 1 ? true : false,
      isLoading: page === 1 ? true: false
    })

    const token = localStorage.getItem('access_token') || ''
    const AuthStr = 'Bearer '.concat(token)
    const status = this.state.selectStatus;

    axios.get(`${API_URL}/orders?page=${page}&status=${status}`, { headers: { Authorization: AuthStr } }).then(({ data: { success, data, currentPage, pages } }) => {
      if (success) {
        this.setState({
          orders: page === 1 ? data : [...this.state.orders, ...data],
          isLoading: false,
          isLoadingMore: false,
          currentPage,
          pages,
        })
      }
    }, (err) => {
      console.log(err)
      this.setState({ orders: [], isLoading: false, isLoadingMore: false })
    })
  }

  handleChangeProperty({_id, data}) {
    const orders = this.state.orders.map(v => {
      if(v._id === _id) {
        return data
      } else {
        return v
      }
    })
    this.setState({
      orders
    })
  }

  selectStatusHandler(_, { value }) {
    if (this.state.selectStatus === value) return;
    this.setState({selectStatus: value}, () => this.loadData())
  }

  render() {
    const { orders, isLoading, isLoadingMore, currentPage, pages } = this.state
    return (
      <AdminTemplate>
        <List divided relaxed>
          <div style={{marginBottom: '8px'}}>
            <Select
                placeholder='Статус'
                onChange={this.selectStatusHandler.bind(this)}
                defaultValue=''
                options={[{ key: 'all', text: 'Всі', value: '' }, ...getAllMetaStatus]} />
          </div>
          <Loader isLoading={isLoading}>
          { orders.length > 0
            ? orders.map((order, index) => {
              const statusMeta = getStatusMeta({ key: order.status });
              const liqPay = order?.payment?.status === 'success';
              const liqPayDate = liqPay ? moment(order?.payment?.end_date).format('DD.MM.YYYY HH:mm:ss'): null
              return <List.Item key={order._id + index} style={{padding: '10px', border: '1px solid #ddd'}} >
                <List.Content>
                  <List.Header style={ {textAlign: 'center', marginBottom: '15px'} }>
                    Замовлення №{order.orderId}
                    <Label color={statusMeta.color} horizontal size='small' style={{marginLeft: '8px'}}>{statusMeta.text}</Label>
                    <Icon name='print' onClick={()=> OrderPrint(order, window)} style={{cursor: 'pointer', marginLeft: '8px'}} />
                    <OrderEditor trigger={<Icon name='edit' style={{cursor: 'pointer', marginLeft: '8px'}} />} order={order} onChangeProperty={this.handleChangeProperty.bind(this)} />
                    &nbsp;&nbsp;{moment(order.createdAt).format('DD.MM.YYYY HH:mm:ss')}
                    {!liqPay && <a href={`/checkout/${order._id}`} style={{marginLeft: '8px'}} target='_blank'><Icon name='money bill alternate outline' /></a>}
                  </List.Header>
                  <List.Description>
                      <Grid columns={2} stackable>
                        <Grid.Row>
                          <Grid.Column>
                            <Item.Group divided unstackable>
                              {order.products.map(product => (
                                <Item key={product.item._id} stackable='false'>
                                  <Item.Image size='tiny' src={product.item.img} />
                                  <Item.Content verticalAlign='middle'>
                                    <b>{product.item.title}</b><br/>
                                    <p>
                                      кол-во (шт): { product.count }<br/>
                                      цена ($): { product.item.price }<br/>
                                    </p>
                                  </Item.Content>
                                </Item>
                              ))}
                            </Item.Group>
                            <div style={{textAlign: 'right'}}>
                              Итого: &nbsp; <b>{order.total + 'грн'} (${order.courseUSD})</b>
                              {liqPay && <Label color='green' horizontal  style={{marginLeft: '8px'}}>LiqPay </Label>}
                              {liqPay && <span style={{fontSize: '.9rem'}}>{liqPayDate}</span>}
                            </div>
                            <div style={{textAlign: 'right'}}>


                            </div>
                          </Grid.Column>
                          <Grid.Column>
                            {order._info && 
                              <fieldset style={{border: '1px solid #efefef'}}>
                                <legend><b>Info</b></legend>
                                {order._info}
                              </fieldset>
                            }
                            <fieldset style={{border: '1px solid #efefef'}}>
                              <legend><b>Доставка</b></legend>
                              {order.delivery.region}, {order.delivery.city}, {order.delivery.office}<br/><br/>

                              {order.user.name}<br/>
                              {order.user.phone}<br/>
                              {order.user.email}<br/>

                              { order.promocode.length > 0 && <span><br />Промокод: <Label color='green' horizontal>{order.promocode}</Label><br/></span> }
                            </fieldset>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </List.Description>
                </List.Content>
              </List.Item>
            })
            : <List.Item>
                <List.Content>
                  <List.Header>Пусто</List.Header>
                </List.Content>
              </List.Item>
          }
          <LoadMore
              loading={isLoadingMore}
              page={currentPage}
              disabled={currentPage >= pages}
              loadData={this.loadData} />
          </Loader>
        </List>
      </AdminTemplate>
    )
  }
}

const LoadMore = ({loading, page, disabled, loadData}) => {
  return <Segment color='green' textAlign='center'>
    <Button
      color='green'
      disabled={disabled}
      loading={loading}
      onClick={() => loadData(page + 1)}
    >
      Завантажити ще
    </Button>
  </Segment>
}

export default OrderList
