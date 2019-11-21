import React from 'react'
import ReactDom from 'react-dom'
import Game from './game'

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector("#root");
    ReactDom.render(<Game />, root)
});