import PropTypes from 'prop-types'
import {useEffect} from 'react'
import { connect }from 'react-redux'
import { getAnuncios } from "../../actions/anuncios";
import Spinner from "../layout/Spinner";
import AnunciosItem from './AnunciosItem';
import AnunciosForm from './AnunciosForm';


const Anuncios = ({getAnuncios,auth, anuncios: {anuncios, loading}}) => {

    useEffect(() => {
        
        getAnuncios()
      
    }, [])
    

  return (
    <>
        {
            loading ? <Spinner/> 
                : 
            <>
                <h1 className='text-primary'>Posts</h1>
                <p className='lead'>
                    <i className='fas fa user'>
                        Tablón de anuncios Generales
                    </i>
                </p>
               {auth.user.tipo == 'Administrador'? <AnunciosForm/>:<></>}

                {
                    anuncios && anuncios.length > 0 ? 

                    <div className="posts">

                        {
                            anuncios.map(item=>{
                                return <AnunciosItem  key={item._id} anuncios={item} />
                            })
                        }

                    </div>

                    : 
                    
                    <p>Aún no hay aununcios</p>
                }

                
            </>
        }
    </>
  )
}

Anuncios.propTypes = {
    getAnuncios: PropTypes.func.isRequired,
    anuncios: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    anuncios : state.anuncios,
    auth: state.auth
})

export default connect(mapStateToProps, { getAnuncios })(Anuncios) 