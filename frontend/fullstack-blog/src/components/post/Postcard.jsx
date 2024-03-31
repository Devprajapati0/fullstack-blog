import React from 'react'
import { Link } from 'react-router-dom'


function Postcard({
    title,
    content,
    featuredImage,
    _id,
    username
}) {
  return (
  <div>
    <Link to={`/post/${_id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'><img src={featuredImage}  className='rounded-xl' alt="" /></div>
        <h2 className='text-xl font-bold'>{title}</h2>
        <p>{content}</p>
        <div> username:{username[0]}</div>
    </div>
    </Link>
  </div>
  )
}

export default Postcard