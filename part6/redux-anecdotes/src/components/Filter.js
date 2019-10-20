import React from "react"
import {connect} from "react-redux"
import { filterAction } from "../reducers/filterReducer"

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault()
    const keyword = event.target.value
    props.filter(keyword)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    filter: keyword => {
      dispatch(filterAction(keyword))
    }
  }
}

export default connect(null, mapDispatchToProps)(Filter)