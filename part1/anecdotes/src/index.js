import React,{useState} from 'react';
import ReactDOM from 'react-dom';



const mostVotes = (votes) => {
    if(votes.length === 0){
        return -1;
    }
    let maxVote = votes[0];
    let maxVoteIndex = 0;
    for(let i = 1; i < votes.length; i++){
        if(votes[i] > maxVote) {
            maxVote = votes[i];
            maxVoteIndex = i;
        }
    }
    return maxVoteIndex;
}

const mostVoteSummarry = (isVoted, highestVoteSentence) => {
    if(isVoted){
        return (
            <div>
                {highestVoteSentence}
            </div>
        )
    }else {
        return (
            <div>
                No vote given
            </div>
        )
    }
}
let isVote = false;

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [highestVote, setHighestVote] = useState(0);

    const points = Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0);
    const [vote, setVote] = useState(points);

    
    const setToVote = () => {
        const copy = [...vote];
        copy[selected]++;
        setVote(copy);
        setHighestVote(mostVotes(copy));
        isVote = true;
    }


    return (
        <div>
            <h2>Anecdote of the day</h2>
            {props.anecdotes[selected]}
            <p>has {vote[selected]} votes</p>
            <div>
                <button onClick={() => setToVote()}>vote </button>
                <button onClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))}>next anecdote </button>
            </div>
            <h2>Acnecdote with most votes</h2>
            {mostVoteSummarry(isVote,props.anecdotes[highestVote])}
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));