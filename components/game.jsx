import React from 'react'
import SimonButton from './button'
import GameOver from'./gameOver'

export default class Game extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            gameOver: false,
            gameStarted: false,
            selected: '',
            pos: -1,
            name: 'New Player'
        };
        this.handleClick = this.handleClick.bind(this);
        this.colors = ["red", "blue", "green", "yellow"];
        this.sequence = [];
        this.inputSequence = [];
        this.highScores = [];
        this.score = 0;
        this.selectColor = this.selectColor.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.playGame = this.playGame.bind(this);
    }

    componentDidMount(){
        window.addEventListener('keypress', () => {
           this.setState({gameStarted : true})
           this.playGame();
        })
    }

    playGame(){
        this.generateColor();
        this.playSequence();
    }

    playSequence(){
         this.interval = setInterval(this.selectColor, 500);
    } 
    
    selectColor(){
        this.setState({selected: ''})
        let newPos = this.state.pos + 1;
        if (!this.sequence[newPos]) clearInterval(this.interval)
        setTimeout(this.setState({ pos: newPos, selected: this.sequence[newPos] }), 100)       
    }

    generateColor(){
        let pos = Math.floor(Math.random() * this.colors.length);
        this.sequence.push(this.colors[pos])
    }

    guessSequence(){
        
    }

    resetGame(){
        this.inputSequence = [];
        this.sequence = [];
        this.score = 0;
        this.setState({
            gameOver: false,
            gameStarted: true,
            selected: '',
            pos: -1})
        setTimeout(this.playGame, 500)
    }

    handleClick(e){
        this.inputSequence.push(e.target.classList[0]);
        let pos = this.inputSequence.length - 1;
        if (this.inputSequence[pos] !== this.sequence[pos]) {
            this.highScores.push([this.state.name, this.score])
            this.setState({ gameOver: true })
        }
        if (pos === this.sequence.length - 1 && !this.state.gameOver) {
            this.inputSequence = [];
            this.score ++;
            this.setState({pos: -1})
            this.playGame();
        }
    }

    render(){
        let gameStarted = this.state.gameStarted ? "" : "Press SPACE to start game";
        let modal = this.state.gameOver ? <GameOver highScores={this.highScores.sort((a,b) => b[1] - a[1])} func={this.resetGame}/> : null;
        return(
            <div>
                {modal}
            <div className='game-grid' onClick={this.handleClick}>
                {this.colors.map((color, idx) => <SimonButton 
                key={idx} color={color}
                highlighted={color === this.state.selected}
                disabled={this.state.selected}/>) }
            </div>
                <li>
                    {gameStarted}
                </li>
            </div>
        )
    }
}
