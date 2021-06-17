import { useState } from "react"


const DownloadFile = ({downloadPageLink}) => {
    const [copied, setCopied] = useState(false)
    const handleClick = ()=>{
        navigator.clipboard.writeText(downloadPageLink)
        setCopied(true)
    }
    return (
        <div className='p-1'>
            <h1 className='my-2 text-lg font-medium text-black'>Your file is uploaded, copy the url and share it.</h1>
            <div className='flex space-x-3'>
                <span className='break-all text-black'>{downloadPageLink}</span>
                <img src="/images/copy.png" alt="" className='w-8 h-8 object-contain cursor-pointer' onClick={handleClick} />
                {
        copied &&  <span className='text-black'>✅</span>
                }
           
            </div>
        </div>
    )
}

export default DownloadFile
