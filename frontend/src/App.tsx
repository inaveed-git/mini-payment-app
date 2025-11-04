import React from 'react'
import { BrowserRouter , Routes  , Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Signup from "./page/Signup"
import Signin from './page/Signin'
import useLoadUser from './hook/useLoadUser'
import DashBoard from './page/DashBoard'
import { useRecoilValue } from 'recoil'
import { userState } from './recoil/authAtom'

// import SendMoneyCard from './page/SendMoneyCard'

const App = () => {
  useLoadUser()

    const { user, isLoading } = useRecoilValue(userState);

      if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <BrowserRouter> 
    
    <Routes >
{/* <Route path='/' element={< SendMoneyCard/>}></Route> */}
      {/* public route  */}
  <Route path='/auth/signup' element={<Signup />} />
      <Route path='/auth/signin' element={<Signin />} />


      <Route element={< PrivateRoute />}>
      
      
    
      <Route path='/dashboard/user' element={< DashBoard />}/>
      
      
      </Route>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App