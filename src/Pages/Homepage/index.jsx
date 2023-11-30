import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'


const API_URL = "http://localhost:5005";


function HomePage() {

  const [postsList, setPostsList] = useState([]);

  useEffect(()=>{
    axios
    .get(`${API_URL}/api/posts`)
    .then((response)=>{
      const postData = response.data;

      setPostsList(postData);
    })
    .catch((error)=> console.log(error))
  }, []);


  return (
    <div>
        <h1>HOMEPAGE</h1>
        <h2>All Posts</h2>
        <div> <div></div>
          {postsList &&
            <div>
              {postsList.map((post, index)=>{
                return(
                    <div key={index}>
                      <p>{post.title}</p>
                    </div>
                )
              })}
            </div>}
        </div>
    </div>
  )
}

export default HomePage