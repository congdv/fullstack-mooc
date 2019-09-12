import React from 'react'



const Notification = ({message, isErrorMessage}) => {
    if(message === null){
        return null;
    }
    if(isErrorMessage){
        return (
            <div className='error'>{message}</div>
        )
    } else {
        return (
            <div className='info'>{message}</div>
        )
    }
}

export default Notification;