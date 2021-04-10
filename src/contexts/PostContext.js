import React, { useState, useContext } from "react"

const PostContext = React.createContext()
const PostUpdateContext = React.createContext()


export function usePosts() {
  return useContext(PostContext)
}

export function usePostsUpdate() {
  return useContext(PostUpdateContext)
}

export function PostProvider({ children }) {
  const [postArray, setPostArray] = useState([])

  function savePosts(posts) {
    return setPostArray(posts)
  }

  console.log('PostContext: postArray', postArray)

  return (
    <PostContext.Provider value={postArray}>
      <PostUpdateContext.Provider value={savePosts} >
        {children}
      </PostUpdateContext.Provider>
    </PostContext.Provider>
  )
}