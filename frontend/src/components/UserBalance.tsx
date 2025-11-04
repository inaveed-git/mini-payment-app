import React, { useEffect, useState } from 'react'
import axios from 'axios';
const UserBalance = () => {
  const [Userbalance , setUserBalance] = useState(0);

  // useEffect(() => { 
  // try {
  //     const fetchBalance = async () => { 
  //         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/account/amount` , {withCredentials: true})
  //         setUserBalance(response.data.userBalance)
  //   }

   
  // } catch (error) {
  //   return <h3>error occur in the balance fetching</h3>
  // }

  //  fetchBalance()
  // } ,[])
  


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/account/amount`,
          { withCredentials: true }
        );
        setUserBalance(response.data.userBalance.balance);
      } catch (err) {
        console.error(err);
       
      } 
    };

    fetchBalance();
  }, []); // empty array = run once on mount
  return (
   <>
    
   <div className='flex   p-4 space-x-2 space-y-2'>
    <h3 className='font-bold text-xl '>Your Balance</h3>
    <h2 className='font-bold text-xl'>{Userbalance}</h2>
   </div>
   
   
   </>
  )
}

export default UserBalance