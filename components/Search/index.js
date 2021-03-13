import { connect } from 'react-redux';

import Search from './Search';
import {setSearchQuery} from "../../redux/reducers/products";

const mapStateToProps = (state) => ({ searchQuery: state.products.searchQuery })
  
const mapDispatchToProps = { setSearchQuery };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
