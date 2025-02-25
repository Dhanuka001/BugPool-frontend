import React from 'react'
import Feed from '../components/Feed';  

const Home = () => {
  return (
    <div className="home-page">
      <h1 className="text-4xl text-center py-8">Welcome to BugPool</h1>
     
      <Feed />
    </div>
  );
}

export default Home;