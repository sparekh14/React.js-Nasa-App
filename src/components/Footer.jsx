import React from 'react'

export default function Footer(props) {
  const { handleDisplayModal, data } = props

  return (
    <footer>
        <div className='bgGradient'></div>
        <div>
            <h1>NASA APOD Project</h1>
            <h2>{data?.title}</h2>
        </div>
        <button onClick={handleDisplayModal}>
            <i className="fa-solid fa-circle-info"></i>
        </button>
    </footer>
  )
}
