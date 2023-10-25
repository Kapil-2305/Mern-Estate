import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const {currentUser} = useSelector((state) => state.user);
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <img src={currentUser.avatar} alt='avatar' className='w-24 h-24 rounded-full self-center object-cover cursor-pointer mt-2'/>
                
                <input type='text' placeholder='username' id='username' className='border rounded-lg p-3'/>
                <input type='email' placeholder='email' id='email' className='border rounded-lg p-3'/>
                <input type='text' placeholder='password' id='password' className='border rounded-lg p-3'/>

                <button className='bg-slate-700 text-white rounded-lg p-3 mt-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
            </form>

            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}

export default Profile