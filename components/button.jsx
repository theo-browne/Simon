import React from 'react'

export default class SimonButton extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            highlighted : this.props.highlighted
        }
    }

    render(){
        let highlight = this.props.highlighted ? 'highlight' : 'nonhighlight'
        let clickable = !this.props.disabled ? false : true
        return(
            <button disabled={clickable} className={this.props.color + ' ' + highlight}>
                
            </button>
        )
    }
}