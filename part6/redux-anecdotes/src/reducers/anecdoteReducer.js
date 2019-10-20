import anecdotesService from "../services/anecdotes"
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]


// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdotesReducer = (state = [], action) => {
  switch(action.type){
    case "VOTE":
      const updatedAnecdote = action.data
      return state.map( acnecdote => 
        acnecdote.id !== updatedAnecdote.id ? acnecdote : updatedAnecdote).sort((prev,curr) => (curr.votes - prev.votes))
    case "NEW_ANECDOTES":
      const newAnecdote = action.data
        return state.concat(newAnecdote);
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state;
  }
}

export const increaseVotes = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const savedAnecdote = await anecdotesService.update(anecdote.id, updatedAnecdote)
    dispatch({
      type: "VOTE",
      data: savedAnecdote
    })
  }
}

export const filterAnecdotes = (keyword) => {
  return {
    type: "FILTER_ANECDOTES",
    data: keyword
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch({
      type: "NEW_ANECDOTES",
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,  
    })
  }
}

export default anecdotesReducer