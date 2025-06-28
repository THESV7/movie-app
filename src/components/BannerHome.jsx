import React from 'react'
import { useSelector } from 'react-redux'

const BannerHome = () => {
    const bannerData = useSelector(state => state.movieData.bannerData)

    console.log("banner Home",bannerData );
    
  return (
    <div>
        <div>
            {
                bannerData.map((data,index)=>{
                    return(
                        <div>
                            
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default BannerHome