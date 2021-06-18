import { useState, useEffect } from "react"
import QRCode from "react-qr-code"

const DownloadFile = ({downloadPageLink}) => {
    const [copied, setCopied] = useState(false)
    const handleClick = ()=>{
        navigator.clipboard.writeText(downloadPageLink)
        setCopied(true)
    }
useEffect(()=>{
    if(copied){
        setTimeout(()=>{
setCopied(false)
        },1000)
    }
},[copied])


    return (
        <div className='p-1'>
            <h1 className='my-2  text-lg font-extrabold  p-2 my-3 text-blue-500  '>Your file is uploaded, Scan QR code to share or copy url.</h1>
            <div className='flex justify-center items-center'>
        <QRCode 
        value={downloadPageLink}
        size={100}
        level={'H'}
        // includeMargin={true}
          />
            </div>
            <div className='flex space-x-3 mt-3'>
                <div className='break-all text-black border p-2 '>{downloadPageLink}</div>
                <div>
                <img src="/images/copy.png" alt="" className='w-8 h-8 object-contain cursor-pointer' onClick={handleClick} />
                {
        copied &&  <p className='text-black'>✅</p>
                }
                </div>
               
           
            </div>
        </div>
    )
}

export default DownloadFile
