import axios from "axios";
import { IFile } from "libs/types";
import RenderFile from "@components/RenderFile";
import { GetServerSidePropsContext, NextPage } from "next";
import fileDownload from 'js-file-download'

 const index:NextPage<{file: IFile}> = ({file}) => {

    const handleDownload  = async ()=>{
        const {data}  = await axios.get(`http://localhost:8000/api/files/${file.id}/download`,{responseType:'blob'})
        fileDownload(data, file.name)
    }

    return (
      
        <div className='h-screen max-w-xl m-auto p-5  flex flex-col gap-10 items-center'>
              <h1 className='mx-1 my-2 bg-gray-800 w-max font-extrabold text-2xl  p-2 px-4 text-lg rounded-md'>shareBro</h1>
  
            { file.id ?
            <div className='bg-white p-2 rounded-md flex flex-col justify-center items-center space-y-4'>
                <img src="/images/file-download.png" alt="" className='w-16 h-16' />
                <h1 className='text-black'>Your file is ready to be downloaded!</h1>
  <RenderFile  file={{
      format: file.format,
       name:file.name,
      sizeInBytes:file.sizeInBytes
      }} 
     
      />
       <button className='button' onClick={handleDownload} >Download</button>

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
 const {data}  = await axios.get(`http://localhost:8000/api/files/${id}`)
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
