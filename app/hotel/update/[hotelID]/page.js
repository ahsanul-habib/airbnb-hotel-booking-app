import { auth } from '@/auth';
import UpdatePage from './UpdatePage'
import { redirect } from 'next/navigation';

const UpdatePageWrapper=async({params})=>{
  const session=await auth();
  const email=session?.user?.email;
  const hotelID=params.hotelID;
  if(!email){
    redirect(`/login?callback=${encodeURIComponent(`/hotel/update/${hotelID}`)}`);
  }

  return (<UpdatePage userEmail={email} hotelID={hotelID}/>
  )
}

export default UpdatePageWrapper