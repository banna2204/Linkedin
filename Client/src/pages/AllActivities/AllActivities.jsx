import React, { useState,useEffect } from 'react'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card/Card';
import Post from '../../components/Post/Post';
import axios from 'axios';

const AllActivities = () => {
  const {id} = useParams();

   const [post, setPosts] = useState([])
  const [ownData, setOwnData] = useState(null)

  const fetchDataOnLoad = async() => {
    await axios.get(`https://linkedin-4wbd.onrender.com/api/post/getAllPostForUser/${id}`).then(res=>{
          setPosts(res.data.posts)
      }).catch(err => {
            console.log(err)
            alert("Something Went Wrong")
        })
    }

    useEffect(()=>{
      fetchDataOnLoad();
      let userData = localStorage.getItem('userInfo');
      setOwnData(userData? JSON.parse(userData):null)
  },[])

  return (
        <div className='px-5 xl:px-50 py-16 flex gap-5 w-full mt-6 bg-gray-100'>
      
      <div className='w-[22%] sm:block sm:w-[33%] hidden py-5 '>
        <div className='h-fit'>
          <ProfileCard data={post[0]?.user}/>
        </div>

      </div>

      <div className='w-[100%] py-5 sm:w-[50%]'>
        <div>
          <Card padding={1}>
            <div className='text-xl'>All Activity</div>
            <div className='cursor-pointer w-fit p-2 border-1 rounded-4xl bg-green-800 my-2 text-white font-semibold'>Posts</div>

            <div className='my-2 flex flex-col gap-2'>
              {
                post.map((item,index)=>{
                  return (
                    <div key={index}>
                      <Post item={item} personalData={ownData}/>
                    </div>
                  )
                })
              }
            </div>
          </Card>
        </div>
      </div>      

        


      
    </div>
  )
}

export default AllActivities
