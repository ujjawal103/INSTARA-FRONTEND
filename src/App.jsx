import Home from './pages/Home'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogout from './pages/UserLogout'
import StoreHome from './pages/StoreHome'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import StoreLogin from './pages/StoreLogin'
import StoreSignup from './pages/StoreSignup'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import StoreProtectedWrapper from './pages/StoreProtectedWrapper'
import NotFound from './pages/NotFound'
import { Toaster } from 'react-hot-toast'
import StoreLogout from './pages/StoreLogout'

import AppLayout from "./components/AppLayout";
import StoreBarbers from './components/StoreBarbers'
import StoreBookingHistory from './pages/StoreBookingHistory'
import StoreWallet from './pages/StoreWallet'
import UserWallet from './pages/UserWallet'
import UserBookingHistory from './pages/UserBookingHistory'





const App = () => {
  return (
    <div>
      <AppLayout>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/store-login' element={<StoreLogin />} />
        <Route path='/store-signup' element={<StoreSignup />} />            

      
        <Route path='/home' element={
           <UserProtectedWrapper>                               
            <Home />
          </UserProtectedWrapper>
        } />

       <Route path='/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />


        <Route path='/user-wallet' element={
          <UserProtectedWrapper>
            <UserWallet />
          </UserProtectedWrapper>
        } />


         <Route path='/user-bookings' element={
          <UserProtectedWrapper>
            <UserBookingHistory />
          </UserProtectedWrapper>
        } />
























        <Route path='/store-home' element={
          <StoreProtectedWrapper>
            <StoreHome />
          </StoreProtectedWrapper>
        }
        />


        <Route path='/store-logout' element={
          <StoreProtectedWrapper>
                <StoreLogout />
          </StoreProtectedWrapper>
        } />

        <Route path='/store-barbers' element={
          <StoreProtectedWrapper>
            <StoreBarbers />
          </StoreProtectedWrapper>
        } />



        <Route path='/store-bookings' element={
          <StoreProtectedWrapper>
            <StoreBookingHistory />
          </StoreProtectedWrapper>
        } />

        <Route path='/store-wallet' element={
          <StoreProtectedWrapper>
            <StoreWallet />
          </StoreProtectedWrapper>
        } />


        {/* <Route path="/store/:id" element={
          <UserProtectedWrapper>
            <StoreDetailsToUser />
          </UserProtectedWrapper>
          } /> */}

        <Route path="*" element={<NotFound />} />

      </Routes>
      </AppLayout>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default App

