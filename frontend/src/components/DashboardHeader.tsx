import React from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../recoil/authAtom'

const DashboardHeader = () => {

  const { user } = useRecoilValue(userState);
  const firstLatter = user?.firstName.charAt(0).toUpperCase()

  return (
    <div>


      <div className='flex justify-between items-end p-5'>
        <div>
          <h1 className='font-bold text-xl'>Payment App

          </h1>
        </div>
        <div className='profile flex  items-center space-x-2'>
          <span className='font-medium'>Hello</span>
          <div className='rounded-full bg-slate-200 w-10 h-10  flex justify-center items-center'>{firstLatter}</div>
        </div>

      </div>
      <div className="w-full border border-gray-400"></div>

    </div>
  )
}

export default DashboardHeader