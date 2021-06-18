import axios from "axios";
import { IFile } from "libs/types";
import RenderFile from "@components/RenderFile";
import { GetServerSidePropsContext, NextPage } from "next";
import fileDownload from 'js-file-download'
import { useState } from "react";

 const index:NextPage<{file: IFile}> = ({file}) => {
     const[downloadState,setDownloadState] = useState<'Download' | 'Downloading...'>('Download')
     const[downloadDone,setDownloadDone] = useState(false)


    const handleDownload  = async ()=>{
        if(downloadState === 'Downloading...') return 
        setDownloadDone(false)
        setDownloadState('Downloading...')
        const {data}  = await axios.get(`${process.env.API_BASE_ENDPOINT}api/files/${file.id}/download`,{responseType:'blob'})
        fileDownload(data, file.name)
        if(data){
            setDownloadState('Download')
            setDownloadDone(true)
        }
    }

    return (
      
        <div className=' px-5 py-2  '>
               <div className=' border-b border-gray-600 '>
      <h1 className='mx-1 mt-1 w-max font-extrabold text-2xl  p-2 px-4 text-lg '> <span className='-mr-2'>🔰</span> ShareBro</h1>
      </div>
            { file.id ?
            <div className='h-30 max-w-md m-auto mt-20 bg-white p-2 rounded-md flex flex-col justify-center items-center space-y-4'>
                <img src="/images/file-download.png" alt="" className='w-16 h-16' />
                <h1 className='text-blue-500 font-semibold border-b border-gray-600 p-2'>Your file is ready to be downloaded!</h1>
  <RenderFile  file={{
      format: file.format,
       name:file.name,
      sizeInBytes:file.sizeInBytes
      }} 
     
      />
      <div className='flex justify-center items-center gap-2 '>
      <button className='button' onClick={handleDownload} >{downloadState} 🚀</button>
       {downloadDone && <span className='text-black'>Done ✅</span>}

      </div>
      
            </div>
    :( <span>Oops! File does not exist! check the URL!</span> )
        }
        </div>
      
    )

}
export default index;

export async function getServerSideProps(context:GetServerSidePropsContext){
    const {id} = context.query;
    let file;
    try{
 const {data}  = await axios.get(`${process.env.API_BASE_ENDPOINT}api/files/${id}`)
 file = data;
    }
    catch(err){
        console.log(err.response.data)
        file = {}
    }

    return {
        props: {file},  // will be passed to the page component as props
    }
}
