import React from 'react'
import { Link } from 'react-router-dom'

function Postcard({
    title,
    content,
    featuredImage,
    _id
}) {
  return (
  <div>
    <Link to={`/post/${id}`}>
    <div>
        <img src={featuredImage} alt="" />
        <h2>{title}</h2>
        <p>{content}</p>
    </div>
    </Link>
  </div>
  )
}

export default Postcard