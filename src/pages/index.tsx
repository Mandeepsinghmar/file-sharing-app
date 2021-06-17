import DragDrop from "@components/DropDrag";
import RenderFile from "@components/RenderFile";
import DownloadFile from "@components/DownloadFile";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [file,setFile] = useState(null);
  const [id,setId] = useState(null);
  const [downloadPageLink,setDownloadPageLink] = useState(null);
const [uploadState,setUploadState] = useState<'Upload' | 'Uploading...' | 'Upload Failed' | 'Uploaded' >('Upload')

const handleUpload = async () => {
  if(uploadState === 'Uploading...') return ;
  setUploadState('Uploading...')
  const formData = new FormData()
  formData.append('myFile', file)
  try {
  const {data} = await axios({
    method: 'post',
     data:formData, 
     url:'api/files/upload',
     headers:{
     'Content-Type':'multipart/form-data'
  },
})
console.log(data)
setDownloadPageLink(data.downloadPageLink)
setId(data.id)
  // setUploadState('Uploaded')
  }
  catch(err){
    console.log(err)
    setUploadState('Upload Failed')
  }
}

const showDragDrop = ()=>{
  setFile(null)
  setDownloadPageLink(null)
}

  return (
    <div className=" bg-gray-900 p-5 ">
     <h1 className='mx-1 my-2 bg-gray-800 w-max font-extrabold text-2xl  p-2 px-4 text-lg rounded-md'>shareBro</h1>
     <div className='flex flex-col items-center justify-center mt-14 '>
       <div>
         <h1 className='my-4 text-2xl font-medium '>Share your files easily by using shareBro!</h1>
       </div>
       {/* drag and drop  */}

       <div className='bg-white text-center rounded-md'>
         {
           !downloadPageLink &&    <div className='max-w-xl'>
           <DragDrop setFile={setFile}/>
           </div>
         }
    

        {/* render file  */}
        { file &&
      <RenderFile file={{
      format: file.type.split("/")[1],
       name:file.name,
      sizeInBytes:file.size
      }}/>
        }
    
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
