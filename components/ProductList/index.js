import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit'
import { withRouter } from 'next/router'

import ProductList from './ProductList';
import {fetchProducts, setProducts} from "../../redux/reducers/products";

const selectProducts = state => state.products.items;
const selectQuery = state => state.products.searchQuery;
const selectCategory = state => state.category;
const selectSearchProducts = createSelector(
  [selectProducts, selectQuery, selectCategory],
  (products = [], searchQuery = '', category) => {
    const _products = [...products];
    if (!searchQuery || searchQuery === '') {
      if(category === 'all') return products;
      return _products.filter(o => o.category.key === category)
    }
    return _products.filter(o => {
      const queryArr = searchQuery.split(' ')
      const title = o.title.toLowerCase()
      if (title.indexOf((queryArr[0] || '').toLowerCase()) > -1 &&
          title.indexOf((queryArr[1] || '').toLowerCase()) > -1) return true
      return false
    })
  }
)

const mapStateToProps = (state, ownProps) => {
  const { category } = ownProps.router.query;
  const { isLoading, categories, currency } = state.products
  return {
    products: selectSearchProducts({...state, category}),
    categories,
    isLoading,
    currency,
  }
}
  
const mapDispatchToProps = { fetchProducts, setProducts }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));

