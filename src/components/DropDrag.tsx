import {useDropzone} from 'react-dropzone'
import { FC, useCallback } from 'react'

const DropDrag:FC<{setFile}> = ({setFile}) => {
const onDrop = useCallback((acceptedFiles)=>{
    setFile(acceptedFiles[0])
},[])

const {getRootProps,getInputProps , isDragAccept, isDragReject} = useDropzone({
    onDrop,
    multiple:false,
    accept:'image/jpeg,image/png/audio/mpeg'
})  
    return (
        <div className='p-4 bg-blue-800 max-w-xl '>
            <div {...getRootProps()} className={'w-30 h-60 focus:outline-none cursor-pointer border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center '
        + (isDragReject === true ? 'border-red-500' : '')
        + (isDragAccept === true ? 'border-green-500' : '')
        }>
            <input {...getInputProps()} />
            <img src="/images/folder.png" alt="" className='w-16 h-16'/>


{
    isDragReject ? <p>Sorry, this app only supports png/jpeg images and mp3 audio.</p> : (
        <>
        <p >Drap and Drop files here!</p>
        <p className='mt-2 text-base text-gray-3--'>Only png, jpeg and mp3 files supported.</p>
        </>
    )
}
           
            </div>
        </div>
    )
}

export default DropDrag
