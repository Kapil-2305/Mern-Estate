import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import {app} from '../firebase';
import { ref } from 'firebase/storage';

const Profile = () => {
    const {currentUser} = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePercent, setFilePercent] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});

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

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4'>
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