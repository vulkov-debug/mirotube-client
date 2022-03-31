import React, {Children, useState} from 'react'
import { Card } from "antd";
const { Meta } = Card;
import { useRouter } from "next/router";
import VideoThumbnailUtility from '../utilities/VideoThumbnailUtility'



const SingleVideoCard = ({v}) => {

 const [loading, setLoading] = useState(true)

    const router = useRouter();
  return (
    <Card
    onClick={()=> router.push(`/view/${v._id}`)} 
      className="col-md-2 col-sm-5 m-3 p-0" style={{objectFit:'cover'}}
      hoverable
      cover={
        <div style={{height:'120px'}}>
        <VideoThumbnailUtility v={v}/>
        </div>
      }
    >
      <Meta title={v.title} description={v.description ? v.description : v.title}  />
    </Card>
  )
}

export default SingleVideoCard