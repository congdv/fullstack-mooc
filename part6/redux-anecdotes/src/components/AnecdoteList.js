import React from "react"
import { connect } from "react-redux"
import { increaseVotes} from "../reducers/anecdoteReducer"
import { notificationAction } from "../reducers/notificationReducer"
import Anecdote from "./Anecdote"



const AnecdoteList = (props) => {
  const voteIt = (anecdote) => {
    props.vote(anecdote)
    props.setNotfication(`you voted "${anecdote.content}"`,3)
  }
  return (
    <div>
      <h2>Anecdotes</h2>
        {props.visibilityAnecdotes.map(anecdote =>
          <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteIt(anecdote)}/>
        )}
    </div>
  )
}


const anecdotesToShow = ({anecdotes, filter}) => {
  if(filter !== null){
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  }
  return anecdotes
}

const mapStateToProps = (state) => {
  return {
    visibilityAnecdotes : anecdotesToShow(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (anecdote) => {
      dispatch(increaseVotes(anecdote))
    },
    setNotfication: (message,time) => {
      dispatch(notificationAction(message))
      setTimeout(() => {
        dispatch(notificationAction(""))
      }, time*1000);
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList);