import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const SearchPage = () => {
  const location = useLocation()
  const [data,setData] = useState([])
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const fetchData = async () => {
  try {
    const response = await axios.get(`/search/multi`, {
      params: {
        query: location?.search?.slice(3),
        page: page,
      },
    });

    setData((prev) => {
      const combined = [...prev, ...response.data.results];

      const unique = Array.from(
        new Map(
          combined.map((item) => [`${item.media_type}-${item.id}`, item])
        ).values()
      );

      return unique;
    });
  } catch (error) {
    console.log('error', error);
  }
};

  useEffect(()=>{
    setPage(1)
    setData([])
    fetchData()
  },[location?.search])

  const handleScroll = () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      setPage(prev => prev+1)
    }
  }

  useEffect(()=>{
    fetchData()
  },[page])

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
  },[])



  console.log("location",location.search.slice(3));
  
  return (
    <div className='py-16'>
      <div className=' lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input 
          type="text" 
          placeholder='Search here...'
          onChange={(e)=>navigate(`/search?q=${e.target.value}`)}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
        />
      </div>
      <div className='container mx-auto '>
        <h3 className="capitalize text-lg lg:text-xl font-semibold m-2 my-3">Search Results</h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {
            data.map((searchData,index)=>{
              return(
                <Card data={searchData}   key={`${searchData.media_type}-${searchData.id}`} media_type={searchData.media_type} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage