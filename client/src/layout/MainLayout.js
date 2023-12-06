import React from 'react'
import Footer from '../components/Footer'

function MainLayout({children}) {
  return (
    <div className='container mx-auto py-5 h-screen'>
      {children}
      <Footer />
      </div>
  )
}

export default MainLayout