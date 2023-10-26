import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import {app} from '../firebase';
import { ref } from 'firebase/storage';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const Profile = () => {
    const {currentUser, loading, error} = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePercent, setFilePercent] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if(file){
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePercent(Math.round(progress));
        },
        (error)=>{
            setFileUploadError(true);
        },

        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setFormData({...formData, avatar: downloadURL});
            });
        });
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if(data.success === false){
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        }
        catch(error){
            dispatch(updateUserFailure(error.message));
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input onChange={(e)=> setFile(e.target.files[0])} type='file' ref={fileRef} className='hidden' accept='image/*'/>
                <img onClick={()=> fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='avatar' className='w-24 h-24 rounded-full self-center object-cover cursor-pointer mt-2'/>

                <p className='text-sm self-center'>
                {fileUploadError ? (
                    <span className='text-red-700'>
                        Error Image upload (image must be less than 2 mb)
                    </span>
                    ) : filePercent > 0 && filePercent < 100 ? (
                        <span className='text-slate-700'>{`Uploading ${filePercent}%`}</span>
                    ) : filePercent === 100 ? (
                        <span className='text-green-700'>Image successfully uploaded!</span>
                    ) : (
                        ''
                    )}
                </p>
                
                <input onChange={handleChange} type='text' placeholder='username' id='username' defaultValue={currentUser.username} className='border rounded-lg p-3'/>
                <input onChange={handleChange} type='email' placeholder='email' id='email' defaultValue={currentUser.email} className='border rounded-lg p-3'/>
                <input onChange={handleChange} type='password' placeholder='password' id='password' className='border rounded-lg p-3'/>

                <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 mt-3 uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Update'}
                </button>
            </form>

            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>

            {error && <p className='text-red-700 mt-5'>{error}</p>}
            {updateSuccess && <p className='text-green-700 mt-5'>Profile updated successfully!</p>}
        </div>
    )
}

export default Profile