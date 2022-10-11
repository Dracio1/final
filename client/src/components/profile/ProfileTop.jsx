import React from 'react'
import PropTypes from 'prop-types'
import userDefault from'../../img/default-user.png'


const ProfileTop = ({profile: {
        status,
        company,
        location,
        website,
        social,
        user: {name, avatar}
    }}) => {
 
 //forma de desEstructurar las props -n°1   
 /* const {
     status,
     company,
     location,
     website,
     social,
     user: {name, avatar}   
    } = profile
 */

  return (
        <div className="profile-top bg-white border rounded-3 p-2">
          <img
            className="rounded-circle my-1"
            src={avatar ? avatar : userDefault}
            alt=""
          />
          <h1 className="large">{name} </h1>
          <p className="lead">{status} {company && <span>en {company}</span>}</p>
          <p>{location}</p>


          <div className="icons my-1">
            {
                website && 
                    <a href={'www.'+website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                        <p>{website}</p>
                    </a> 
            }  
            {
                social && social.twitter &&
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                     
            }  
            {
                social && social.facebook && 
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a> 
            }  
            {
                social && social.instagram && 
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a> 
            }  
            {
               social && social.linkedin && 
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a> 
            }  
              
          </div>

        </div>
  )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop