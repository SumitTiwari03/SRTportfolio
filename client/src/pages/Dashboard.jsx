import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {
  const [name, setName] = useState()
  const handelReq = async () => {
    const user = await axios.get('/api/dashboard', {
      withCredentials: true
    }).catch(err => console.log("error while fecthing the userdata", err))

    const data = user.data
    return data
  }

  useEffect(() => {
    handelReq()
  }, [])

  return (
    <div>
      <h1>{`Welcome `}</h1>
    </div>
  )
}

export default Dashboard