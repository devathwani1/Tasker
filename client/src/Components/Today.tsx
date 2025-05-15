import React from 'react'

const Today = () => {
  return (
    <div className='h-[800px] overflow-y-auto bg-blue-900 w-[100%] lg:w-[30%] lg:h-screen rounded-4xl'>
        <div className='h-[12%] position- bg-black rounded-t-4xl text-white font-bold text-2xl flex justify-between items-center p-5'>
            <span>Today Tasks</span>
            <span>11-02-25</span>
        </div>
        <div className='rounded-b-4xl p-5 space-y-5 h-[88%] overflow-y-scroll hide-scrollbar'>
            <div className='border-2 border-white rounded-2xl text-white p-4'>
                <div className=' flex justify-between'>
                    <div>
                        <p>Title</p>
                        <p className='text-gray-400'>Quick brown fox jumps over the la... </p>
                    </div>
                        <p>Time : 23:30</p>
                </div>
                <div className='flex justify-between'>
                    <p>Status : <span className='text-yellow-300 font-medium'>PENDING</span></p>
                    <p>Repeating : Yes</p>
                </div>
                <div className='flex justify-between mt-3'>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>M</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>T</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>W</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>Th</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>F</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>St</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>S</div>
            </div>
            </div>
            <div className='border-2 border-white rounded-2xl text-white p-4'>
                <div className=' flex justify-between'>
                    <div>
                        <p>Title</p>
                        <p className='text-gray-400'>Quick brown fox jumps over the la... </p>
                    </div>
                        <p>Time : 23:30</p>
                </div>
                <div className='flex justify-between'>
                    <p>Status : <span className='text-yellow-300 font-medium'>PENDING</span></p>
                    <p>Repeating : Yes</p>
                </div>
                <div className='flex justify-between mt-3'>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>M</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>T</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>W</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>Th</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>F</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>St</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>S</div>
            </div>
            </div>
            <div className='border-2 border-white rounded-2xl text-white p-4'>
                <div className=' flex justify-between'>
                    <div>
                        <p>Title</p>
                        <p className='text-gray-400'>Quick brown fox jumps over the la... </p>
                    </div>
                        <p>Time : 23:30</p>
                </div>
                <div className='flex justify-between'>
                    <p>Status : <span className='text-yellow-300 font-medium'>PENDING</span></p>
                    <p>Repeating : Yes</p>
                </div>
                <div className='flex justify-between mt-3'>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>M</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>T</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>W</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>Th</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>F</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>St</div>
                <div className='w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]'>S</div>
            </div>
            </div>
            
        </div>
    </div>
  )
}

export default Today