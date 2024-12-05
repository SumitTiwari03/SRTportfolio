import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {
  const handelReq = async () => {
    const user = await axios.get('/api/dashboard', {
      withCredentials: true
    }).catch(err => console.log("error while fecthing the userdata", err))

  }

  useEffect(() => {
    handelReq()
  }, [])

  return (
    <div>
      <h1>Welcome <b>Sumit Tiwari</b></h1>
    </div>
  )
}

export default Dashboard