import React from 'react'

export default class SimonButton extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            highlighted : this.props.highlighted
        }
        this.highlightBox = this.highlightBox.bind(this)
        this.unhighlightBox = this.unhighlightBox.bind(this)
    }

    highlightBox(){
        if (!this.props.disabled){
            this.setState({highlighted: true})
        }
    }

    unhighlightBox() {
        this.setState({ highlighted: false })
    }
    render(){
        let highlight = (this.state.highlighted || this.props.highlighted) ? 'highlight' : 'nonhighlight'
        let clickable = !this.props.disabled ? false : true
        return(
            <button disabled={clickable} className={this.props.color + ' ' + highlight} onMouseOver={this.highlightBox} onMouseLeave={this.unhighlightBox}>
                
            </button>
        )
    }
}