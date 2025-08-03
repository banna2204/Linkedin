import React, { useEffect } from "react";
import Card from "../Card/Card";
import { useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from 'axios';
import { Link } from "react-router-dom";

const Post = ({ profile,item,key,personalData }) => {
  const [liked, setLiked] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [noOfLikes,setNoOfLike] = useState(item?.likes.length);

  const desc = item?.desc;

  const handleLike = async() =>{
    await axios.post('http://localhost:4000/api/post/likeDislike',{postId:item?._id},{withCredentials:true}).then(res=>{
      if(liked){
        setNoOfLike((prev)=>prev-1);
        setLiked(false);
      }else{
        setLiked(true);
        setNoOfLike((prev)=>prev+1);
      }
    }).catch(err=>{
      alert('Something Went Wrong')
    })
    
  }

  useEffect(()=>{
    let selfId = personalData?._id;
    item?.likes?.map((item)=>{
      if(item.toString()===selfId.toString()){
        setLiked(true);
        return 
      }
    })
  },[])

  return (
    <Card padding={0}>
      <div className="flex  gap-3 p-4">
        <Link to={`/profile/${item?.user?._id}`} className="w-12 h-12 rounded-4xl">
          <img
            className="rounded-full"
            width={50}
            src={item?.user?.profilePic}
            alt=""
          />
        </Link>
        <div>
          <div className="text-lg font-semibold">{item?.user?.name}</div>
          <div className="text-xs text-gray-500">{item?.user?.headline}</div>
        </div>
      </div>

      <div className="text-md px-4 pb-1 whitespace-pre-line flex-grow">
        {seeMore ? desc : `${desc?.slice(0, 50)}...`}{" "}
        {
          desc?.length>50 && <span
          onClick={() => setSeeMore((prev) => !prev)}
          className="text-gray-400 text-sm cursor-pointer"
        >
          {seeMore ? "See Less" : "See More"}
        </span> 
        }
      </div>

      <div className=" px-4 flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <ThumbUpOutlinedIcon sx={{ color: "blue", fontSize: 12 }} />{" "}
          <div className="text-sm text-gray-600">{noOfLikes} Likes</div>
        </div>
        <div className="flex gap-1 items-center">
          <div className="text-sm text-gray-600">2 Comments</div>
        </div>
      </div>

      {!profile && (
        <div className="flex p-1">
          <div
            onClick={handleLike}
            className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100"
          >
            {" "}
            {liked ? (
              <ThumbUpIcon sx={{ fontSize: 20, color: "blue" }} />
            ) : (
              <ThumbUpOutlinedIcon sx={{ fontSize: 20 }} />
            )}{" "}
            <span>{liked ? "Liked" : "Like"}</span>{" "}
          </div>
          <div className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100">
            {" "}
            <CommentIcon sx={{ fontSize: 20 }} /> <span>Comment</span>{" "}
          </div>
          <div className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100">
            {" "}
            <SendIcon sx={{ fontSize: 20 }} /> <span>Share</span>{" "}
          </div>
        </div>
      )}
    </Card>
  );
};

export default Post;
