import React from 'react'

export default function Sidebar(props) {
  const { handleDisplayModal, data } = props

  return (
    <div className='sidebar'>
        <div className='bgOverlay' onClick={handleDisplayModal}></div>
        <div className='sidebarContent'>
            <h2>{data?.title}</h2>
            <div className='descriptionContainer'>
                <p className='imageDate'>{data?.date}</p>
                <p>{data?.explanation}</p>
            </div>
            <button onClick={handleDisplayModal}>
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    </div>
  )
}
