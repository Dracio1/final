import PropTypes from 'prop-types'
import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { connect }from 'react-redux'
import { getCarreras } from '../../actions/carreras';
import Spinner from "../layout/Spinner";
import CarrerasItem from './CarrerasItem';


const Carreras = ({getCarreras,auth:{user}, carreras: {carreras, loading}}) => {

    useEffect(() => {
        
        getCarreras()
      
    }, [getCarreras])
    

  return (
    <>
        {
            loading ? <Spinner/> 
                : 
            <>
                <h1 className='text-primary'>Carreras disponibles</h1>
               

                {
                    carreras && carreras.length > 0 ? <>
                    <Link to={`/carreras/add-carrera`}>
                                        </Link>
                    <div className="carreras">

                        {
                            carreras.map(item=>{
                                return <CarrerasItem  key={item._id} carreras={item} />
                            })
                        }

                    </div>
                    </>
                    : 
                    
                    <p>Aún no hay carreras disponibles... 😥</p>
                }
            </>
        }
    </>
  )
}

Carreras.propTypes = {
    getCarreras: PropTypes.func.isRequired,
    carreras: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    carreras : state.carreras,
    auth: state.auth
})

export default connect(mapStateToProps, { getCarreras })(Carreras) 