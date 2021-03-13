import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../../constants";

export const initialState = {
  items: undefined,
  categories: [],
  isLoading: true,
  searchQuery: '',
  currency: {
    USD: 0
  },
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data: { success, currency, data, categories } } = await axios.get(`${API_URL}/products`)
    if(!data || !currency.USD) return []
    const products = data.map(o => ({ ...o, id: o._id }))
    return {products, categories, currency}
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      const { products, categories, currency } = action.payload
      const sorted = products.sort((a, b) => b.available - a.available || b.preOrder - a.preOrder)
      return {...state, items: sorted, categories, currency, isLoading: false }
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    setCurrency(state, action) {
      state.currency = action.payload
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      const {products, categories, currency} = action.payload
      const sorted = products.sort((a, b) => b.available - a.available || b.preOrder - a.preOrder)
      return {...state, items: sorted, categories, currency, isLoading: false }
    }
  }
})

export const { setProducts, setSearchQuery, setCurrency } = productsSlice.actions
export default productsSlice.reducer
