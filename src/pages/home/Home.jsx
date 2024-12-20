import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../components/navbar/sidebar/Sidebar'
import Feed from '../../components/navbar/feed/Feed'
const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0)
  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}></Sidebar>
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed category={category}></Feed>
      </div>
    </>
  )
}

export default Home
