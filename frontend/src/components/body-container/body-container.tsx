import React from 'react'
import './body-container.css'
import BitcoinDropDown from '../dropdown/dropdown'

function BodyContainer({ children }: {children: React.ReactNode}) {
  return (
    <div className='body-container'>
      <div className='header-bitcoin'>
        <span className='header-text'>Bitcoin Market</span>
        <div className='seperator'></div>
        <div className='dropdown-container'>
          <BitcoinDropDown></BitcoinDropDown>
        </div>
      </div>
      {children}
    </div>
  )
}

export default BodyContainer
