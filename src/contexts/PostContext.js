import React, { useState, useContext } from "react"

const PostContext = React.createContext()


export function usePosts() {
  return useContext(PostContext)
}

export function PostProvider({ children }) {
  const [postList, setPostList] = useState([])
  let postsArray = postList

  function savePosts(posts) {
    console.log('PostContext savePosts', posts)
    return setPostList(posts)
  }

  const value = {
    postsArray,
    savePosts
  }

  console.log('PostContext PostList', postList)

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  )
}