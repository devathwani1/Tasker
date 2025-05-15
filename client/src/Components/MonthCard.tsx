import React from 'react'

const MonthCard = () => {
  return (
    <div className='rounded-2xl border-2 border-white  lg:w-[13.00%] w-[100%] not-lg:px-1.5 p-1 overflow-y-hidden flex lg:flex-col not-lg:space-x-6'>
        <div className='mb-1'>
            <p className=' text-[1.5rem] lg:text-[1rem] text-white font-medium'>13</p>
        </div>
        <div className='space-y-1 text-sm flex lg:flex-col not-lg:h-[85px] not-lg:space-x-1.5'>
            <div className='text-white border-1 border-white rounded-[5px] px-1'>
                <p>This is...</p>
            </div>
            <div className='text-white border-1 border-white rounded-[5px] px-1'>
                <p>This is...</p>
            </div>
            <div className='text-white px-1 flex justify-end'>
                <p>+</p>
            </div>
           
        </div>
    </div>
  )
}

export default MonthCard