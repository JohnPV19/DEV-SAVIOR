import React from 'react'

function ProfilePage() {
  return (
    <div>
        <div>
            <img src="" alt="your_profile_picture" />
        </div>
        <div>
            <h4>Username:</h4> 
            <p>user_username</p>
        </div>
        <div> 
            <h4>E-mail:</h4> 
            <p>user_email</p>
        </div>
        <div>
            <h4>Projects:</h4>
            <p>user_projects</p>
        </div>
        <div>
            <h4>Skills:</h4>
            <ul> List of tech skills
                <li>Javscript</li>
                <li>React...</li>
            </ul>
        </div>
        <div>
            <h4>Interests:</h4>
            <p>user_interests</p>
        </div>
    </div>
  )
}

export default ProfilePage