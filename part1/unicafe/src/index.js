import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Statistic = (props) => {
    return (
        <tr><td>{props.text}</td> <td>{props.value}</td></tr>
    )
}

const Statistics = (props) => {
    if(props.good === 0 && props.neutral === 0 && props.bad ===0) {
        return (
            <div>No feedback given</div>
        )
    } 
    let all = props.good + props.neutral + props.bad;
    let average = isNaN(((props.good - props.bad) / all)) ? 0:((props.good - props.bad) / all);
    let positive = isNaN(props.good/all) *100 ? 0: (props.good/all);
    return (
        <div>
            <Statistic text="Good" value={props.good}/>
            <Statistic text="Neutral" value={props.neutral}/>
            <Statistic text="Bad" value={props.bad}/>
            <Statistic text="All" value={all}/>
            <Statistic text="Average" value={average < 0 ? 0 : average}/>
            <Statistic text="Positive" value={positive}/>
        </div>
    )
}

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
    // const [votes, setVotes] = useState( {
    //     good: 0,
    //     neutral: 0,
    //     bad: 0
    // })
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);


    return (
        <div>
            <h2>Give Feedback</h2>
            <div>
                <Button handleClick={() => setGood(good+1)} text="Good"/>
                <Button handleClick={() => setNeutral(neutral+1)} text="Neutral"/>
                <Button handleClick={() => setBad(bad+1)} text="Bad"/>
            </div>
            <h2>Statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

