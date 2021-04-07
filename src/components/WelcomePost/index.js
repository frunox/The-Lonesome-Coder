import React from 'react'
import './WelcomePost.css'

function WelcomePost() {
  return (
    <div>
      <div className="post-card-fixed">
        <h2>Welcome!</h2>
        <hr></hr>
        <p className='post-card-summary'>Welcome to the <strong><em>Lonesome Coder</em></strong> blog. I want to be a web developer and know some basics. Where do I go from here, and how do I get there? That's the subject of this blog.</p>

        {/* <blockquote className='block-quote'><em>"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."</em><br></br>
        Martin Fowler</blockquote> */}

        <blockquote className='block-quote'><em>"It is good to have an end to journey towards; but it is the journey that matters in the end."</em><br></br>
        Ursula K. Le Guin</blockquote>

        <p>There a many decisions to be made, obstacles to overcome, failures and successes when creating a new project (like this blog). I'll share my experiences, and invite you to share yours. Links to content by actual experts will be included.</p>
      </div>
    </div>
  )
}

export default WelcomePost
