import React from 'react'

export default class SimonButton extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            highlighted: false
        }
        this.highlightBox = this.highlightBox.bind(this)
        this.unhighlightBox = this.unhighlightBox.bind(this)
    }
    
    componentDidUpdate(prevProps){
        if (prevProps.disabled !== this.props.disabled){
            this.setState({highlighted: false})
        }
    }

    highlightBox(){
        if (!this.props.disabled){
            this.setState({ highlighted: true })
        }
    }

    unhighlightBox() {
        this.setState({ highlighted: false })
    }

    render(){
        let highlight = (this.props.highlighted || (!this.props.disabled && this.state.highlighted))  ? 'highlight' : 'nonhighlight'
        return(
            <button disabled={this.props.disabled} className={this.props.color + ' ' + highlight } onMouseOver={() => this.highlightBox()} onMouseLeave={this.unhighlightBox} >
                
            </button>
        )
    }
}