import React from "react"
import {connect} from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"



const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    props.newAnecdote(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}

export default connect(null, {newAnecdote})(AnecdoteForm)