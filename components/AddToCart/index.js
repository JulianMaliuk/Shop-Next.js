import { connect } from 'react-redux';
import _ from 'lodash';
import AddToCart from './AddToCart';
import {addToCart} from "../../redux/reducers/cart";
import { setIsOpenCart } from '../../redux/reducers/cart'

const isInCart = (cart, id) => {
  const index = _.findIndex(cart, (o) => o.id === id )
  return index >= 0 ? true : false
}

const mapStateToProps = (state) => {
  const { cart: { items } } = state
  return {
    cart: items,
    isInCart: (cart, id) => isInCart(cart, id),
  }
}
  
const mapDispatchToProps = {addToCart, setIsOpenCart}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
