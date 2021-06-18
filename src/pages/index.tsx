import DragDrop from "@components/DropDrag";
import RenderFile from "@components/RenderFile";
import DownloadFile from "@components/DownloadFile";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [file,setFile] = useState(null);
  const [id,setId] = useState(null);
  const [downloadPageLink,setDownloadPageLink] = useState(null);
const [uploadState,setUploadState] = useState('Upload')

const handleUpload = async () => {
  // if(uploadState === 'Uploading...') return ;

  setUploadState('Uploading...')
  const formData = new FormData()
  formData.append('myFile', file)
  try {
  const {data} = await axios({
    method: 'post',
     data:formData, 
     url:`${process.env.API_BASE_ENDPOINT}/api/files/upload`,
     headers:{
     'Content-Type':'multipart/form-data'
  },
})
console.log(data)
setDownloadPageLink(data.downloadPageLink)
setId(data.id)
localStorage.setItem('downloadPageLink', JSON.stringify(data.downloadPageLink))
 setUploadState('Upload')
  }
  catch(err){
    console.log(err)
    setUploadState('Upload Failed')
  }
}
useEffect(()=>{
  const link = JSON.parse(localStorage.getItem('downloadPageLink'))
  if(link){
    setDownloadPageLink(link)
  }
},[])


const showDragDrop = ()=>{
  setFile(null)
  setDownloadPageLink(null)
  localStorage.clear()
}


  return (
    <div className=" bg-gray-900 py-2 px-5 pb-6">
      <div className=' border-b border-gray-600 '>
      <h1 className='mx-1 mt-1 w-max font-extrabold text-2xl  p-2 px-4 text-lg '> <span className='-mr-2'>🔰</span> ShareBro</h1>
      </div>
    
     <div className='flex flex-col items-center justify-center mt-10'>
       <div className='flex flex-col justify-center items-center mb-4'>
        <p className='font-extrabold text-5xl'>File sharing</p>
        <p className='font-black text-5xl text-blue-700'>made easy</p>
        <p className='font-medium text-8'>Select, Upload and Share!</p>
       </div>
       {/* drag and drop  */}

       <div className='max-w-md m-auto bg-white text-center rounded-md'>
         {
           !downloadPageLink && <div className='max-w-xl'>
           <DragDrop setFile={setFile}/>
           </div>
         }
    

        {/* render file  */}
        { file &&
       <div>
         <RenderFile file={{
        format: file.type.split("/")[1],
         name:file.name,
        sizeInBytes:file.size
        }}
    />
     
     </div> }    
    
      {/* upload button  */}
      {!downloadPageLink && file &&  <button className='button' onClick={handleUpload}>{uploadState}</button>}
     
{
  downloadPageLink && (
    <>
      <DownloadFile  downloadPageLink={downloadPageLink}/>
      <button className='button' onClick={showDragDrop} >Upload New File</button>
 </>
  )
}
       </div>
    
     </div>
    
    </div>
  );
}
