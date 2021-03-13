import React from 'react'
import { Button } from 'semantic-ui-react';

const AddToCart = (props) => {

  const { product, isInCart, addToCart, cart, fluid, setIsOpenCart } = props
  const inCart = isInCart(cart, product.id);

  return (
    product.available ? <Button
      content={inCart ? 'Вже у кошику' : 'Придбати'}
      color={inCart ? 'grey' : 'green'}
      fluid={fluid}
      onClick={!inCart ? () => addToCart(product) : ()=>{ setIsOpenCart(true) }}
    /> : <Button disabled>Немає в наявності</Button>
  )
}

export default AddToCart
