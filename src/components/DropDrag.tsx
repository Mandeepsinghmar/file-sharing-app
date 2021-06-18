import {useDropzone} from 'react-dropzone'
import { FC, useCallback } from 'react'

const DropDrag:FC<{setFile}> = ({setFile}) => {
const onDrop = useCallback((acceptedFiles)=>{
 
    setFile(acceptedFiles[0])
    
},[])

const {getRootProps,getInputProps , isDragAccept, isDragReject} = useDropzone({
    onDrop,
    multiple:false,
    // accept:'image/jpeg, image/png, audio/mpeg'
})  
    return (
        <div className='p-4 bg-white rounded-md '>
            <div {...getRootProps()} className={'w-30 h-60 focus:outline-none cursor-pointer border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center '
        + (isDragReject === true ? 'border-red-500' : '')
        + (isDragAccept === true ? 'border-green-500' : '')
        }>
            <input {...getInputProps()} />
            <img src="/images/folder.png" alt="" className='w-16 h-16'/>


{
    isDragReject ? <p>Sorry, this app only supports png/jpeg images and mp3 audio.</p> : (
        <>
        <p className='text-blue-500'>Select files or drag and drop</p>
        <p className='mt-2 text-gray-500 '>File size should be less than 10MB.</p>
        </>
    )
}
           
            </div>
        </div>
    )
}

export default DropDrag
