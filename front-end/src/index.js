import React, { Component } from 'react'
import { Root } from './router'
import {reducer, initialState} from './redux'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

let store = createStore(reducer, initialState);

class App extends Component {
  render() {
    return(

        <Provider store={store}>
            <Root />
        </Provider>

    )
  }
}

export default App;
