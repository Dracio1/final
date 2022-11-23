import PropTypes from 'prop-types'
import {useEffect} from 'react'
import { connect }from 'react-redux'
import { Link } from 'react-router-dom';
import { getMaterias } from '../../actions/materias';
import Spinner from "../layout/Spinner";
import MateriasItem from './MateriasItem';


const Materias = ({getMaterias, materias: {materias, loading}}) => {

    useEffect(() => {
        
        getMaterias()
      
    }, [getMaterias])
    

  return (
    <>
        {
            loading ? <Spinner/> 
                : 
            <>
                <Link to='/materias/addMaterias'></Link>
                <h1 className='text-primary'>Lista de Materias del instituto</h1>
                

                {
                    materias && materias.length > 0 ? 

                    <div>

                        {
                            materias.map(item=>{
                                return <MateriasItem  key={item._id} materias={item} />
                            })
                        }

                    </div>

                    : 
                    
                    <p>Aún no hay materias cargadas... 😥</p>
                }
            </>
        }
    </>
  )
}

Materias.propTypes = {
    getMaterias: PropTypes.func.isRequired,
    materias: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    materias : state.materias,
})

export default connect(mapStateToProps, { getMaterias })(Materias) 