 
import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Alert from "./components/layout/Alert";
import Register from './components/auth/Register'
import setAuthToken  from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'

//neum components
import NeuLogin from './components/auth/NeuLogin'
import NeuNavbar from './components/layout/NeuNavbar'

//

//redux import
import { Provider } from 'react-redux'
import store from './store'
//

const App = () =>  {
 
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  }

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store} >
      <Router>
      
        {/* <Navbar/> */}
        <NeuNavbar/>
        <Route exact path={"/"} component={Landing}/>
        
        <section className="container">
          <Alert/>
          <Switch>
            <Route exact path={"/login"} component={NeuLogin}/>
            <Route exact path={"/profiles"} component={Profiles}/>
            <Route exact path={"/profile/:id"} component={Profile}/>
            <Route exact path={"/register"} component={Register}/>
            <PrivateRoute exact path={"/dashboard"} component={Dashboard}/>
            <PrivateRoute exact path={"/create-profile"} component={CreateProfile}/>
            <PrivateRoute exact path={"/edit-profile"} component={EditProfile} />
            <PrivateRoute exact path={"/add-experience"} component={AddExperience} />
            <PrivateRoute exact path={"/add-education"} component={AddEducation} />
            <PrivateRoute exact path={"/posts"} component={Posts} />
            <PrivateRoute exact path={"/post/:id"} component={Post} />
          </Switch>
        </section>
        
      </Router>
    </Provider>
  )
}

export default App
