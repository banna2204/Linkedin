import React,{useState} from 'react'

const EditinfoModal = ({handleEditFunc,selfData}) => {

  const [data,setData] = useState({name:selfData.name,headline:selfData.headline,curr_company:selfData.curr_company,curr_location:selfData.curr_location});

    const onChangeHandle = (event,key)=>{
        setData({...data,[key]:event.target.value})
    }

    const handleSaveBtn = async()=>{
      let newData = {...selfData,...data};
      handleEditFunc(newData)
    }
  return (
    <div className='mt-2 w-full h-[350px] overflow-y-auto'>
       <div className='w-full mb-2'>
          <label>Full Name</label>
          <br />
          <input value={data.name} onChange={(e)=>{onChangeHandle(e,'name')}} type="text" className='p-2 mt-1 w-full border-1 rounded-md' placeholder='Enter full name' />
       </div>

      <div className='w-full mb-2'>
        <label >Headline</label>
        <br />
        <textarea value={data.headline} onChange={(e)=>{onChangeHandle(e,'headline')}} className='p-2 mt-1 w-full border-1 rounded-md' cols={10} rows={3}></textarea>
      </div>

         <div className='w-full mb-2'>
            <label>Current Company*</label>
            <br/>
            <input type='text' value={data.curr_company} onChange={(e)=>{onChangeHandle(e,'curr_company')}} className='p-2 mt-1 w-full border-1 rounded-md' placeholder='Enter Current Company'/>
        </div>

         <div className='w-full mb-2'>
            <label>Current Location*</label>
            <br/>
            <input type='text' value={data.curr_location} onChange={(e)=>{onChangeHandle(e,'curr_location')}} className='p-2 mt-1 w-full border-1 rounded-md' placeholder='Enter Current Location'/>
        </div>

        <div className="bg-blue-950 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl" onClick={handleSaveBtn}>Save</div>
    </div>
  )
}

export default EditinfoModal