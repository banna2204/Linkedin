import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const AddModal = (props) => {

    // const [imageUrl, setImageUrl] = useState(null)
    const [desc, setDesc] = useState("");
    const [posts, setPosts] = useState([]);

    const handlePost = async () => {
    if (desc.trim().length === 0) return toast.error("Please enter field");

    try {
        const res = await axios.post(
            'https://linkedin-4wbd.onrender.com/api/post',
            { desc },
            { withCredentials: true }
        );

        setPosts(prev => [res.data, ...prev]);
        setDesc(""); 
        toast.success("Post created successfully!");

    } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
    }
};
    return (
        <div className=''>
            <div className='flex gap-4 items-center'>
              <div className='relative'>
                <img src={props.personalData?.profilePic} className='w-15 h-15 rounded-4xl' alt="" />
              </div>
              <div className='text-2xl'>{props.personalData?.name}</div>
            </div>

            <div>
              <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} cols={50} rows={5} placeholder='What do you want to talk about?' className='my-3 outline-0 text-xl p-2'></textarea>
            </div>

            <div className='flex justify-between items-center'>
                <div className="bg-blue-950 text-white py-1 mt-4 px-3 cursor-pointer rounded-2xl h-fit" onClick={handlePost}> Post</div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddModal