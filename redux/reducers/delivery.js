import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { API_URL } from '../../constants'

const initialState = {
  cities: [],
  offices: [],
  regions: [],
  region: '',
  city: '',
  office: '',
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setRegions(state, action) {
      state.regions = [...action.payload]
    },
    setCities(state, action) {
      state.cities = [...action.payload]
    },
    setOffices(state, action) {
      state.offices = [...action.payload]
    },
    setRegion(state, action) {
      state.region = action.payload
      state.cities = []
      state.offices = []
      state.city = ''
      state.office = ''
    },
    setCity(state, action) {
      state.city = action.payload
      state.offices = []
      state.office = ''
    },
    setOffice(state, action) {
      state.office = action.payload
    },
  },
})

export const fetchRegions = () => dispatch => {
  axios.get(API_URL + `/delivery/regions`).then(({ data: regions }) => {
    dispatch(deliverySlice.actions.setRegions(regions))
  })
}
export const fetchCities = (region) => dispatch => {
  axios.get(API_URL + `/delivery/cities/${region}`).then(({ data }) => {
    const cities = data.map(({ Ref, Description }) => ({ key: Ref, text: Description, value: Ref }))
    dispatch(deliverySlice.actions.setCities(cities))
  })
}
export const fetchOffices = (city) => dispatch => {
  axios.get(API_URL + `/delivery/offices/${city}`).then(({ data }) => {
    const offices = data.map(({ Ref, Description }) => ({ key: Ref, text: Description, value: Ref }))
    dispatch(deliverySlice.actions.setOffices(offices))
  })
}

export const { setRegion, setCity, setOffice } = deliverySlice.actions
export default deliverySlice.reducer
