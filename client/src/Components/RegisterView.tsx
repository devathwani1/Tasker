import React, { useContext, useEffect, useState } from 'react'


type RegisterDataType = {
    'name' : string,
    'password' : string
}
const RegisterView = () => {
    const [userData,setUserData] = useState<RegisterDataType>({
        'name' : '',
        'password' : ''
    })


        const submitData = async () => {
          if(userData.name == "" || userData.password == ""){
            alert("Name or Password is empty!") 
            return;
          }
            try {
            const response = await fetch('http://localhost:3000/register',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(userData)
            })
            const data = await response.json()
            console.log(data)
            }
            catch(e){
                console.error(String(e))
            }

        }




  return (
    <>
              <span className='text-4xl text-white font-bold'>Register</span>
                <div className='w-full h-full flex flex-col justify-center gap-6 pb-15'>
                  <input value={userData.name} onChange={(e) => setUserData({
                    ...userData,
                    'name' : e.target.value
                  })} type="text" placeholder='Username' className='border-4 border-white text-white p-4 rounded-3xl focus:outline-0'/>
                  <input value={userData.password} onChange={(e) => setUserData({
                    ...userData,
                    'password' : e.target.value
                })} type="text" placeholder="Password" className='p-4 border-4 border-white rounded-3xl focus:outline-0'/>
                  <button onClick={()=> submitData()} className='p-4 bg-white rounded-3xl text-black font-bold'>Submit</button>
                </div>
    </>
  )
}

export default RegisterView