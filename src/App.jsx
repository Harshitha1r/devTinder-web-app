import { useState } from 'react'
import Login from './components/Login'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import { Provider } from 'react-redux'
import store from './state/store'
import Home from './components/Home'
import Profile from './components/Profile'
import Connections from './components/Connection'
import Requests from './components/Requets'
import SignUp from './components/Signup'
import Chat from './components/Chat'

function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Connections" element={<Connections/>}/>
            <Route path="/Requests" element={<Requests/>}/>
            <Route path="/Signup" element={<SignUp/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/chat/:targetid" element={<Chat/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
