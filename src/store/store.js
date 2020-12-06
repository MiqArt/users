import { configureStore, combineReducers } from '@reduxjs/toolkit'

import users from './users'

const reducer = combineReducers({
  users
})

const store = configureStore({
  reducer
})

export default store;
