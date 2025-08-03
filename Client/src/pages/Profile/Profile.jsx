import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Post from "../../components/Post/Post";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Model from "../../components/Model/Model";
import EditinfoModal from "../../components/EditInfoModal/EditInfoModal";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [ownData, setOwnData] = useState(null);
  const [infoModal, setInfoModal] = useState(false);
  const [post, setPosts] = useState([]);

  useEffect(() => {
    fetchDataOnLoad();
  }, [id]);

  const fetchDataOnLoad = async () => {
    try {
      const [userDatas, ownDatas, allposts] = await Promise.all([
        axios.get(`http://localhost:4000/api/auth/user/${id}`),
        axios.get("http://localhost:4000/api/auth/self", {
          withCredentials: true,
        }),
        axios.get(`http://localhost:4000/api/post/getAllPostForUser/${id}`),
      ]);
      setPosts(allposts.data.posts);
      setUserData(userDatas.data.user);
      setOwnData(ownDatas.data.user);
      localStorage.setItem("userInfo", JSON.stringify(ownDatas.data.user));
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong");
    }
  };

  const handleInfoModal = () => {
    setInfoModal((prev) => !prev);
  };

  const handleEditFunc = async (data) => {
    await axios
      .put(
        `http://localhost:4000/api/auth/update`,
        { user: data },
        { withCredentials: true }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Something Went Wrong");
      });
  };

  const handleLogout = async () => {
    await axios
      .post(
        `http://localhost:4000/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Something Went Wrong");
      });
  };

  return (
    <div className="px-5 xl:px-50 py-5 mt-5 flex flex-col gap-5 w-full pt-12 bg-gray-100">
      <div className="flex justify-between">
        <div className="w-full md:w-[70%]">
          <div>
            <Card padding={0}>
              <div className="w-full h-fit">
                <div className="relative w-full h-[200px]">
                  <img
                    src="../public/cover.jpg"
                    className="w-full h-[200px] rounded-tr-lg rounded-tl-lg"
                  />
                  <div className="absolute object-cover top-24 left-6 z-10">
                    <img
                      src={userData?.profilePic}
                      className="rounded-full border-2 border-white cursor-pointer w-35 h-35"
                      alt=""
                    />
                  </div>
                </div>

                <div className="mt-10 relative px-8 py-2">
                  {userData?._id === ownData?._id && (
                    <div
                      className="absolute cursor-pointer top-0 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white"
                      onClick={handleInfoModal}
                    >
                      <EditIcon />{" "}
                    </div>
                  )}
                  <div className="w-full">
                    <div className="text-2xl">{userData?.name}</div>
                    <div className="text-gray-700">{userData?.headline}</div>
                    <div className="text-sm text-gray-500">
                      {userData?.curr_location}
                    </div>
                    <div className="text-md text-blue-800 w-fit cursor-pointer hover:underline">
                      20 Connections
                    </div>

                    <div className="md:flex w-full justify-between">
                      <div className="my-5 flex gap-5">
                        <div className="cursor-pointer text-sm p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Open to
                        </div>
                        <div className="cursor-pointer text-sm p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Share
                        </div>

                        {userData?._id === ownData?._id && (
                        <div
                          onClick={handleLogout}
                          className="cursor-pointer text-sm p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold"
                        >
                          Logout
                        </div>
                          )}
                      </div>
                      <div className="my-5 flex gap-5">
                        <div className="cursor-pointer text-sm p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Message
                        </div>
                        <div className="cursor-pointer text-sm p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Connect
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="my-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">About</div>
              </div>
              <div className="text-gray-700 text-md w-[80%]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
                maiores voluptas nesciunt soluta architecto illo dicta earum
                quis ex nisi!
              </div>
            </Card>
          </div>
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Activities</div>
              </div>
              <div className="cursor-pointer px-3 py-1 w-fit border-1 rounded-4xl bg-green-800 text-white font-semibold">
                Posts
              </div>

              <div className="overflow-x-auto my-2 flex gap-1 overflow-y-hidden w-full">
                {post?.map((item, ind) => (
                  <div
                    key={item?._id}
                    className="cursor-pointer shrink-0 w-[350px] h-[260px] overflow-auto"
                  >
                    <Post profile={1} item={item} personalData={ownData} />
                  </div>
                ))}
              </div>

              <div className="w-full flex justify-center items-center">
                {post.length > 0 && (
                  <div
                    onClick={() => navigate(`/profile/${id}/activities`)}
                    className="p-2 rounded-xl cursor-pointer hover:bg-gray-300"
                  >
                    Show All Posts <ArrowRightAltIcon />
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
      {infoModal && (
        <Model title="Edit Info" closeModal={handleInfoModal}>
          <EditinfoModal handleEditFunc={handleEditFunc} selfData={ownData} />
        </Model>
      )}
    </div>
  );
};

export default Profile;
