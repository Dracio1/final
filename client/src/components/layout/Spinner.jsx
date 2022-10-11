import React from 'react' 
import spinnerGif from '../../img/loading.gif'

export default () => {
    return <>
        <img
            src={spinnerGif}
            style={{ width: '100px', margin: 'auto', display: 'block'}}
            alt='loading...'
        />
    </>
}