import { useSelector } from "react-redux"
import BannerHome from "../components/BannerHome"
import Card from "../components/Card"
import HorizontalScrollCard from "../components/HorizontalScrollCard"
import { useEffect, useState } from "react"
import axios from "axios"
import useFetch from "../hooks/useFetch"

const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData)
  const { data : nowPlayingData } = useFetch("/movie/now_playing")
  const { data : topRatedData } = useFetch("/movie/top_rated")
  const { data : popularTvShowData } = useFetch("/tv/popular")
  const { data : onTheAirShowData } = useFetch("/tv/on_the_air")

  return (
    <div>
      <BannerHome/>
      <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true} />
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
      <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"}/>
      <HorizontalScrollCard data={popularTvShowData} heading={"Popular TV Shows"} media_type={"tv"}/>
      <HorizontalScrollCard data={onTheAirShowData} heading={"On The Air"} media_type={"tv"}/>
      
      
    </div>
  )
}

export default Home