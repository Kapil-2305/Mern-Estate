import React from 'react'

const CreateListing = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required/>
                <textarea placeholder='Description' className='border p-3 rounded-lg' id='description' required/>
                <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required/>
            </div>
        </form>
    </main>
  )
}

export default CreateListing