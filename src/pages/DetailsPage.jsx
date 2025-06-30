import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails'

const DetailsPage = () => {
  const params = useParams()
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)

  console.log("data",data);
  

  
   
  return (
    <div>DetailsPage</div>
  )
}

export default DetailsPage