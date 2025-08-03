import React, { useState, useEffect } from 'react'
import Card from '../../components/Card/Card'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArticleIcon from '@mui/icons-material/Article';
import Post from '../../components/Post/Post';
import Model from '../../components/Model/Model';
import AddModal from '../../components/AddModal/AddModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Feeds = () => {

  const [personalData, setPersonalData] = useState(null);
  const [post, setPost] = useState([])

  const [addPostModal, setAddPostModal] = useState(false);

  const fetchData = async () => {
    try {
      const [userData, postData] = await Promise.all([
        await axios.get('http://localhost:4000/api/auth/self', { withCredentials: true }),
        await axios.get('http://localhost:4000/api/post/getAllPost')
      ]);
      setPersonalData(userData.data.user)
      localStorage.setItem('userInfo',JSON.stringify(userData.data.user))
      setPost(postData.data.posts);


    } catch (err) {
      toast.error(err?.response?.data?.error)
    }

  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleOpenPostModal = () => {
    setAddPostModal(prev => !prev)
  }
  return (
    <div className='px-5 xl:px-50 py-16 flex gap-5 w-full mt-4 bg-gray-100'>
      
      <div className='w-[22%] sm:block sm:w-[33%] hidden py-5 '>
        <div className='h-fit'>
          <ProfileCard data={personalData}/>
        </div>

        <div className='w-full my-5'>
          <Card padding={1}>
            <div className=" w-full flex justify-between">
              <div>Profile Viewers</div>
              <div className="text-blue-900">39</div>
            </div>
            <div className=" w-full flex justify-between">
              <div>Post Impressions</div>
              <div className="text-blue-900">40</div>
            </div>
          </Card>
        </div>

      </div>

      


      <div className='w-[100%] py-5 md:mt-5 sm:w-[50%] border-l-1 border-r-1 border-gray-300 p-5'>

        
        <div>
          {/* <Card padding={1}/> */}
          <div className='flex gap-2 items-center'>
            <img className="rounded-full" width={50} src={personalData?.profilePic} alt="" />
            <div onClick={()=>setAddPostModal(true)} className='w-full border-1 py-3 px-3 rounded-full cursor-pointer hover:bg-gray-100'>Start a post</div>
          </div>

          <div className='w-full flex mt-3'>
            <div className='flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'><VideoCallIcon sx={{color:"green"}}/>Video</div>
            <div className='flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'><InsertPhotoIcon sx={{color:"blue"}}/>Photo</div>
            <div className='flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'><ArticleIcon sx={{color:"orange"}}/>Article</div>
          </div>
        </div>

        <div className='border-b-1 border-gray-400 w-[100%] my-5'/>
        

        {/* <div className="border-b-1 border-gray-400 w-[100%] my-5" /> */}

        <div className='w-full flex flex-col gap-5'>

          {
            post.map((item, index) => {
              return <Post item={item} key={index} personalData={personalData} />;
            })
          }

        </div>

      </div>

      {/* right */}
      <div className='w-[26%] py-5 hidden md:block'>
        <div>
          <Card padding={1}>
            <div className='text-xl'>LinkedIn News</div>
            <div className='text-gray-600'>Top stories</div>
            <div className='my-1'>
              <div className='text-md'>Top cities see salaries rise</div>
              <div className='text-xs text-gray-400'>2h ago</div>
            </div>
            <div className='my-1'>
              <div className='text-md'>Top Want to stand out?Say hello</div>
              <div className='text-xs text-gray-400'>2h ago</div>
            </div>
          </Card>
        </div>
      </div>

      
      <ToastContainer />
      {
        addPostModal && <Model closeModal={handleOpenPostModal} title={""} >
        <AddModal personalData={personalData}/> 
      </Model>
      }
    </div>
  )
}

export default Feeds