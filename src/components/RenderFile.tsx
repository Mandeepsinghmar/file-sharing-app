import { sizeInMb } from "libs/sizeInMb"
import { IFile } from "libs/types"
import { FC } from "react"


const RenderFile:FC<{file: IFile}> = ({file:{name,format,sizeInBytes}}) => {
    return (
        <div className='flex items-center w-full p-4 my-2 text-black'>
            <img src={`/images/${format}.png`} alt="" className='w-14 h-14'/>
            <span className='mx-2 '>{name}</span>
            <span className='ml-auto' >{sizeInMb(sizeInBytes)}</span>
        </div>
    )
}

export default RenderFile
