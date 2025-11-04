import React from 'react'
import DashboardHeader from '../components/DashboardHeader'
import UserBalance from '../components/UserBalance'
import SearchUser from "../components/SearchUser"
const DashBoard = () => {
  return (
    <div className=''>
          <DashboardHeader />
    <UserBalance />
    <SearchUser />
    </div>
  )
}

export default DashBoard