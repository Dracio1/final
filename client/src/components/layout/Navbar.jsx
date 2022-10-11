import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/auth'

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {

    const authLinks = (
        <ul>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"></i>{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Cerrar Sesión</span>
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link to="/profile">Developers</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
            <li><Link to={"/login"}>Entrar</Link></li>
        </ul>
    )


    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> IPF-devs
                </Link>
            </h1>

            {
                !loading && (<> { isAuthenticated ? authLinks : guestLinks } </>)
            }
        </nav>
    )
}

Navbar.propTypes = {
    logout : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
}) 

export default connect(mapStateToProps, {logout})(Navbar)
