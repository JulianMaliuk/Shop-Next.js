import { connect } from 'react-redux';

import Checkout from './Checkout';
import {setCurrency} from "../../redux/reducers/products";
import {setRegion, setCity, setOffice, fetchRegions, fetchCities, fetchOffices} from '../../redux/reducers/delivery'
import {updateCartByID, cleanCart} from "../../redux/reducers/cart";

const mapStateToProps = (state) => {
  const { delivery, cart: { items: cart }, products: { currency } } = state
  return {
    delivery,
    cart,
    currency,
  }
}
  
const mapDispatchToProps = { setCurrency, updateCartByID, cleanCart, setRegion, setCity, setOffice, fetchRegions, fetchCities, fetchOffices }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
