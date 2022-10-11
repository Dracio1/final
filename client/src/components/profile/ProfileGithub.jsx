import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getGitHubRepos } from '../../actions/profile'

const ProfileGithub = ( {username, getGitHubRepos, repos} ) => {

  useEffect(() => {

     getGitHubRepos(username)

    }, [getGitHubRepos, username])
  
  return (
    
    <div>
      {
        repos && repos.length < 1 ? <p> sin repositorios 😴 </p> : 
          repos.map((item, index) => 
          <div key={index} className="repo bg-white p-1 my-1">
            <div className="">
              <h4>
                <a href={item.html_url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </h4>
              <p>{item.description}</p>
            </div>
            <div className="ul">
              <li className="badge badge-primary">
                stars: {item.stargazers_count}
              </li>
              <li className="badge badge-dark">
                watchers: {item.watchers_count}
              </li>
              <li className="badge badge-light">
                forks: {item.forks_count}
              </li>
            </div>
          </div>)
      }
    </div>
  )
}

ProfileGithub.propTypes = {
  getGitHubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({ 
  repos: state.profile.repos
 }) 

export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithub)