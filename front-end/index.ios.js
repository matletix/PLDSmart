import React from 'react'
import { AppRegistry } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './src/index'

// Import the reducer and create the Redux store
import { reducer } from './src/redux'
const store = createStore(reducer)

// Pass the store into the Provider
const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('FeliCity', () => AppWithStore)
