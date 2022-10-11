import { Link } from 'react-router-dom'

const EnviarVolver = () => {
  return (
    <div className='my-3 d-flex justify-content-end ' >
        <input type="submit" 
        className="green-icon btn w-25 " 
        />  

        <Link className=" blue-icon btn btn-light " to="/dashboard">
          Volver
        </Link>
    </div>
  )
    
};

export default EnviarVolver;
