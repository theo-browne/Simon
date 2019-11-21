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
            name: 'New Player',
            inputSequence: [],
        };
        this.colors = ["red", "blue", "green", "yellow"];
        this.sequence = [];
        this.inputSequence = [];
        this.highScores = [];
        this.score = 0;
        this.selectColor = this.selectColor.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.playGame = this.playGame.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.startGame = this.startGame.bind(this)
    }

    componentDidMount(){
        window.addEventListener('keypress', this.startGame)
        
    }
    startGame(e){
        if (e.code === 'Space'){
            this.setState({ gameStarted: true })
            this.playGame();
            window.removeEventListener('keypress', this.startGame)
        }
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
        if (!this.sequence[newPos]){
            this.setState({selected: 'finished'})
            setTimeout(() => {
                clearInterval(this.interval)
                this.setState({selected: ''})
            }
            , 100)
        } else {
            setTimeout(this.setState({ pos: newPos, selected: this.sequence[newPos] }), 100) 
        }
              
    }

    generateColor(){
        let pos = Math.floor(Math.random() * this.colors.length);
        this.sequence.push(this.colors[pos])
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
        if (!this.state.gameStarted) return
        this.inputSequence.push(e.target.classList[0]);
        let pos = this.inputSequence.length - 1;
        if (this.inputSequence[pos] !== this.sequence[pos]) {
            this.highScores.push([this.state.name, this.score])
            clearInterval(this.interval)
            this.setState({ gameOver: true })
        }
        if (pos === this.sequence.length - 1 && !this.state.gameOver) {
            this.inputSequence = [];
            this.score ++;
            this.setState({pos: -1, selected: ''})
            setTimeout(this.playGame, 500)
        }
    }

    handleInput(e){
        this.setState({ name: e.target.value }) 
    }
    render(){
        let gameStarted = this.state.gameStarted ? null : <div className='start-game'>
            <li>Press SPACE to start game</li>
            <li className='change-link'>Click &nbsp; <li className='change-name' onClick={() => this.setState({ changeName: true })}> HERE </li> &nbsp; to change name</li>
        </div>;
    let modal = this.state.gameOver ? <GameOver highScores={this.highScores.sort((a,b) => b[1] - a[1])} func={this.resetGame}/> : <div>
        <h1>Hello {this.state.name}</h1>
        </div>;
        return(
            <div>
                {modal}
            <div className='game-grid' onClick={this.handleClick}>
                {this.colors.map((color, idx) => <SimonButton 
                key={idx} color={color}
                highlighted={color === this.state.selected}
                disabled={this.state.selected}/>) }
            </div>
                    {gameStarted}
            </div>
        )
    }
}
