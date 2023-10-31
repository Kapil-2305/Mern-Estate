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

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5'/>
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5'/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5'/>
                        <span>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5'/>
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5'/>
                        <span>Offer</span>
                    </div>
                </div>

                <div className=''>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bedrooms' min={1} max={10} required className='p-3 border border-gray-300 rounded-lg'/>
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bathrooms' min={1} max={10} required className='p-3 border border-gray-300 rounded-lg'/>
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='regularPrice' min={1} max={10} required className='p-3 border border-gray-300 rounded-lg'/>
                        <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            <span className='text-sm'>($ / month)</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='discountPrice' min={1} max={10} required className='p-3 border border-gray-300 rounded-lg'/>
                        <div className='flex flex-col items-center'>
                            <p>Discounted Price</p>
                            <span className='text-sm'>($ / month)</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </main>
  )
}

export default CreateListing