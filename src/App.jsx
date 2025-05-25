import React from 'react'
import Navbar from './Components/Navbar'
import Header from './Components/Header'
import Search from './Components/Search'
import About from './Components/About'
import Footer from './Components/Footer'

const App = () => {
  return (
    <>
    
    <Navbar />
    
    <div id="home">
      <Header />
    </div>

    <div id="search">
      <Search />
    </div>

    <div id="about">
      <About />
    </div>

    <div id='contact'>
      <Footer />
    </div>

    </>
  )
}

export default App
