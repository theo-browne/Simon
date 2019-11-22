import React from 'react'

const GameOver = (props) => {
    return(
        <div className='game-over'>
            <h1>GAME OVER</h1>
            <h2>High Scores</h2>
            {props.highScores.map((score, idx) => <div className='score' key={idx}> 
                {/* <li>Name: {score[0]}</li> */}
                <li>Score: {score[1]}</li>
                </div>)}
        <button onClick={props.func}>CLICK TO PLAY AGAIN</button>
        </div>
    )
}
export default GameOver