import React from 'react'
import './Video.css'
import { useParams } from 'react-router-dom'
import PlayVideo from '../../components/playvideo/PlayVideo'
import Recommended from '../../components/recommended/Recommended'
const Video = () => {
  const { videoId, categoryId } = useParams();
  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId}></PlayVideo>
      <Recommended categoryId={categoryId} />
    </div>
  )
}

export default Video
