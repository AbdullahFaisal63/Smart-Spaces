import React from 'react'


function Home() {
  return (
    <div>
        Welcome {localStorage.getItem("username")}
    </div>
  )
}

export default Home