import React from "react"
import { connect } from "react-redux"
import { Alert } from "react-bootstrap"



const Notification = (props) => {
  const notification = props.notification
  console.log(notification.message)
  if(notification.message === undefined || notification.message === "" ){
    return null
  }
  return (
    <div>{(notification.message && <Alert variant={notification.type}>{notification.message}</Alert>)}</div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default  connect(mapStateToProps)(Notification)