import React from 'react'

const AuthView : React.FC<{children : React.ReactNode}> = ({children}) => {
  return (
    <>
    <div className='flex h-[calc(100vh-50px)]'>
        <div className="h-full w-[65%]  bg-no-repeat bg-cover not-lg:hidden" style={{backgroundImage : "url('/auth_liquid.jpg')"}}></div>
        <div className='h-full flex justify-center items-center not-lg:w-screen w-[35%]'>
            <div className='not-lg:w-[80%] not-lg:h-[70%] not-lg:rounded-3xl flex-col bg-black text-white p-8 h-full lg:w-full'>
              {children}
            </div>
        </div>
    </div>
    </>
  )
}

export default AuthView