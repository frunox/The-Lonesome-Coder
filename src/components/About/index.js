import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../postContent.css'

function About() {
  let content = `## About Me
  
  I am a former civil engineer who decided to change careers. I completed a MERN stack boot camp and am looking for a job. My circle of friends doesn't include coders, and as I'm working on my own, I decided to create this blog to share experiences from the point of view of someone with little experience.  Please join and share some of yours.

  Much of my content will be about the trials and successes of creating the blog, which is my most ambitious project to date.  It's also still in development, so the posts will the steps in the development process. You won't get expert advice from me.  I'll provide my insights, with links to sources I used during the process.
  
  ## Creating the Blog
  
  It started with _create-react-app_ and went from there. I decided to use Firebase as the back end because I want to learn and use cloud services, and, well, it's pretty simple to use. I worked with AWS for a while, but it's not a straightforward as Firebase.  And, the free tier is more lenient.

  Firebase provides the server, an authentication service, a database (I'm using Firestore) and cloud storage for files and images.  Learn more about Firebase [here](https://firebase.google.com).

  All of the posts and much of the content on the site is written in markdown.  In researching how to create posts, it became clear that writing in markdown is much easier than writing HTML or JSX. The posts are written in markdown (*.md) files, and the content on this page is written into a string literal. I use the _react-markdown_ package to render the markdown as JSX.

  I didn't want to use a site-building service like WordPress or Blogger, which are very popular for creating blogs. For this project, I am sticking with the basics, to improve my skills with HTML, CSS and React.  I don't consider myself a front-end developer, but that's what I'm concentrating on now. More detail will be provided in the posts. 
  `

  return (
    <div className='content'>
      <ReactMarkdown linkTarget={'_blank_'}>{content}</ReactMarkdown>
    </div>
  )
}

export default About
