import React from 'react'

const GameOver = (props) => {
    let name = 'Local Player'
    return(
        <div className='game-over'>
            <h1>GAME OVER</h1>
            <div className='name-input'>
                <li>Enter Your Name: </li>
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    // e.target.children[0].value = ''
                    e.target.children[0].disabled = true
                }}>
                    <input type="text"  placeholder={name} onChange={props.inputName} /> <br />
                </form>
               
            </div>
            <h2 className='your-score'>Your Score: {props.score}</h2>
            <button className='reset-button'onClick={props.func}>CLICK TO PLAY AGAIN</button>
            <h2>Previous High Scores</h2>
            {props.highScores.map((score, idx) => <div className='score' key={idx}> 
                <li>Name: {score[0]}</li>
                <li>Score: {score[1]}</li>
                </div>)}
        </div>
    )
}
export default GameOver