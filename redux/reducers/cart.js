import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  items: [],
  isOpenCart: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    REHYDRATE(state, action) {
      return {...state, ...action.payload}
    },
    addToCart(state, action) {
      state.items = [...state.items, {...action.payload, count: 1}]
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(o => o.id !== action.payload)
    },
    cleanCart(state) {
      state.items = []
    },
    setCount(state, action) {
      const { id, count } = action.payload
      const item = state.items.find(o => o.id === id)
      if(item) item.count = count;
    },
    updateCartByID(state, action) {
      const { id, product } = action.payload
      state.items = state.items.map(o => o.id === id ? { ...o, ...product } : o)
    },
    setIsOpenCart(state, action) {
      state.isOpenCart = action.payload
    },
  },
})

export const selectCart = state => state.cart.items;
export const { addToCart, cleanCart, removeFromCart, setCount, updateCartByID, setIsOpenCart, REHYDRATE } = cartSlice.actions
export default cartSlice.reducer
