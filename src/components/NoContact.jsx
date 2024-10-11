import React from 'react'

const NoContact = () => {
  return (
    <div className='flex items-center gap-2 flex-col justify-center h-[calc(100vh-200px)]'>
      <div className='flex flex-col items-center'>
        <img src='Hands Contact.png' alt='No contacts' className='w-20 h-20 object-contain' />
        <h1 className='text-white font-semibold mt-4'>NO CONTACT FOUND</h1>
      </div>
    </div>
  )
}

export default NoContact;