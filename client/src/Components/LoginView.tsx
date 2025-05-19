import React, { useState } from 'react'

type LoginDataType = {
  'name' : string,
  'password' : string
}
const LoginView = () => {
  const [userData,setUserData] = useState<LoginDataType>({
    'name' : '',
    'password' : ''
  })

  const submitData = async () => {
    if(userData.name == "" || userData.password == ""){
      alert("Username or password is empty!")
      return;
    }

    try{
      const response = await fetch('http://localhost:3000/login',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(userData)
      })
      const data = await response.json()
      if(!data['token']){
        alert("Token missing in the response!")
        return;
      }
      localStorage.setItem('jwt_token',data['token'])
      console.log("Setted token in the local storage!")
    }
    catch(e){
      console.error(String(e))
    }
  }

  return (
    <>
              <span className='text-4xl text-white font-bold'>Login</span>
                <div className='w-full h-full flex flex-col justify-center gap-6 pb-15'>
                  <input value={userData.name} onChange={(e) => setUserData({
                    ...userData,
                    'name' : e.target.value
                  })} type="text" placeholder='Username' className='border-4 border-white text-white p-4 rounded-3xl focus:outline-0'/>
                  <input value={userData.password} onChange={(e)=> setUserData({
                    ...userData,
                    'password' : e.target.value
                  })} type="text" placeholder="Password" className='p-4 border-4 border-white rounded-3xl focus:outline-0'/>
                  <button onClick={submitData} className='p-4 bg-white rounded-3xl text-black font-bold'>Submit</button>
                </div>
    </>
  )
}

export default LoginView