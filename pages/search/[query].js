import React, {useEffect, useState} from 'react'
import UserRoute from '../../components/routes/UserRoute'
import {useRouter} from 'next/router'
import axios from 'axios'
import { SyncOutlined } from '@ant-design/icons'
import SingleVideoCard from '../../components/cards/SingleVideoCard'
import { Empty } from 'antd'

const search = () => {

    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const {query} = router.query

   useEffect(()=> {
    fetchSearchResults()
   },[query])

   const fetchSearchResults = async () => {
       setLoading(true)
       const {data} = await axios.get(`/api/search/${query}`)
       setVideos(data)
       setLoading(false)
   }

  return (
    <UserRoute>
              <div className="row" style={{'height': loading && '100%', 'overflow': loading && 'hidden'}}>
            {!loading ? (
              videos.map((v) => (
                <SingleVideoCard v={v} key={v._id} />
              ))
            ) : (
              <SyncOutlined
                spin
                className="col-md-3 offset-md-4 display-1 text-danger p-5 "
              />
            )}
          </div>
          {!videos.length && <Empty className='p-5' style={{marginLeft: '-250px'}} />}
    </UserRoute>
  )
}

export default search