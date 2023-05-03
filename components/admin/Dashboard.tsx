import React from 'react'

export default function Dashboard() {
  return (
    <div className='flex flex-col w-screen'>
      <div className='flex gap-3 border border-gray-100 p-8'>
        <div className='flex flex-col border items-center justify-center p-3 basis-1/2'>
          <h1>Front Page Posts Quantity</h1>
          <div>
            <select name="postnums" id="postnums">
              <option value="6">3</option>
              <option value="6">4</option>
              <option value="6">6</option>
              <option value="6">12</option>
            </select>
          </div>
          <div>
            <button>Change</button>
          </div>
        </div>
        <div className='flex flex-col border items-center justify-center p-3 basis-1/2'>
          <h1>Front Page Posts Quantity</h1>
          <div>
            <select name="postnums" id="postnums">
              <option value="6">3</option>
              <option value="6">6</option>
              <option value="6">12</option>
            </select>
          </div>
          <div>
            <button>Change</button>
          </div>
        </div>
      </div>
      <div className="flex gap-3 border border-gray-100 p-8">
        <div className='flex flex-col border items-center justify-center p-3 basis-1/2'>
          <h1>Front Page Posts Quantity</h1>
          <div>
            <select name="postnums" id="postnums">
              <option value="6">3</option>
              <option value="6">6</option>
              <option value="6">12</option>
            </select>
          </div>
          <div>
            <button>Change</button>
          </div>
        </div>
        <div className='flex flex-col border items-center justify-center p-3 basis-1/2'>
          <h1>Front Page Posts Quantity</h1>
          <div>
            <select name="postnums" id="postnums">
              <option value="6">3</option>
              <option value="6">6</option>
              <option value="6">12</option>
            </select>
          </div>
          <div>
            <button>Change</button>
          </div>
        </div>
      </div>
    </div>
  )
}
