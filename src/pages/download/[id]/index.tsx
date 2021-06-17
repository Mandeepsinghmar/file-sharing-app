import axios from "axios";
import { IFile } from "libs/types";
import { GetServerSidePropsContext, NextPage } from "next";


 const index:NextPage<{file: IFile}> = ({file}) => {
    return (
        <div className='flex justify-center items-center'>
            
           {file.name}
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
