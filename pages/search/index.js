import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import { LoadingOutlined } from '@ant-design/icons'

const SearchIndex = () => {
const router = useRouter()

useEffect(() => {
  router.push('/')
},[])

    return <LoadingOutlined className='d-flex justify-content-center display-1 text-danger p-5' spin/>

}

export default SearchIndex