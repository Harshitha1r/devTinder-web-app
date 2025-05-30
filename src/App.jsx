import { useState } from 'react'
import Login from './Login'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Body'
import { Provider } from 'react-redux'
import store from './state/store'
import Home from './Home'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
