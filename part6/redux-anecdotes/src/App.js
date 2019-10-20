import React, { useEffect } from 'react';
import {connect} from "react-redux"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = (props) => {
  useEffect(() => {
   props.initializeAnecdotes()
  })
  return (
    <div>
      <Notification/>
      <Filter/>
      <AnecdoteForm/>
      <AnecdoteList/>
    </div>
  )
}



export default connect(null, {initializeAnecdotes})(App)