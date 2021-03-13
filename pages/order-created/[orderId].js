import React, { useEffect, useState } from 'react';
import { Message, Loader, Segment, Dimmer } from 'semantic-ui-react'

import { PageTemplate } from '../../components';
import {API_URL} from "../../constants";
import axios from "axios";
import { useRouter } from 'next/router'

const OrderCreated = (props) => {
  const router = useRouter()

  const [isLoading, setLoading] = useState(true);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const { orderId } = router.query
    if(!orderId) return
    async function fetchData() {
      axios.get(`${API_URL}/orders/payForm/${orderId}`).then(({ data: { success, data } }) => {
        if (success) {
          setOrder(data);
          setLoading(false);
        }
      }, (err) => {
        console.log(err)
      })
    }
    fetchData();
  }, [router.query]);

  if (isLoading) return <PageTemplate>
    <Dimmer active inverted>
      <Loader active inline="centered" content="Загрузка..." />
    </Dimmer>
  </PageTemplate>

  return (
    <PageTemplate>
      <Message 
      success 
      header={`Оформлення замовлення завершено! Номер замовлення: ${order.orderId}`}
      content={'Ми зв\'яжемося з вами протягом 24 годин'} 
      />
      <Message.Content style={{textAlign: 'center'}} dangerouslySetInnerHTML={{__html: order.__html}} />

    </PageTemplate>
  );
}

export default OrderCreated;
