import React from 'react'

export default function Dashboard() {
  return (
    <div className='flex flex-col w-screen p-6 gap-8'>
      <div className="flex">
        <form action="" className='border border-zinc-200 p-3 flex gap-8 items-center'>
          <div className='font-semibold'>
            <label htmlFor="postQty">Posts Quantity</label>
          </div>
          <div>
            <select name="postQty" id="postQty" className='px-5 py-2.5 text-sm rounded-sm'>
              <option value="6">6</option>
              <option value="6">12</option>
            </select>
          </div>
          <div>
            <button className='bg-sky-600  hover:bg-sky-700 border-sky-500 px-5 py-2 text-zinc-100 rounded shadow-sm text-sm font-semibold'>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}
