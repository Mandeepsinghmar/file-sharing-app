import DragDrop from "@components/DropDrag";
import RenderFile from "@components/RenderFile";
import { useState } from "react";

export default function Home() {
  const [file,setFile] = useState(null)
  return (
    <div className=" bg-gray-800 p-5 ">
     <h1 className='mx-1 my-2 bg-white text-black w-max font-extrabold text-2xl  p-2 px-4 text-lg rounded-md'>shareBro</h1>
     <div className='flex flex-col items-center justify-center'>
       <div>
         <h1 className='my-4 text-2xl font-medium '>Share your files easily by using shareBro!</h1>
       </div>
       {/* drag and drop  */}
       <div className='bg-white pb-5 text-center'>
       <div className='max-w-xl'>
       <DragDrop setFile={setFile}/>
       </div>

        {/* render file  */}
        { file &&
      <RenderFile file={{
      format: file.type.split("/")[1],
       name:file.name,
      sizeInBytes:file.size
      }}/>
        }
      
    
       
     
     
      {/* upload button  */}
      <button className='p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none'>Upload</button>
       </div>
    
     </div>
    
    </div>
  );
}
