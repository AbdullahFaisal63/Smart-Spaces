import React from 'react'
import Navbar from './navbar';


function Home() {
  return (
    <div>
      <Navbar />
        Welcome <b>{localStorage.getItem("username")}</b>! <br></br>
        This is the home page.
    </div>
  )
}

export default Home