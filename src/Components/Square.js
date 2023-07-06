import React, { Component } from 'react'
import "./Square.css"

const Square = ({onClick3, value}) =>{

    return(
        <button className="square" onClick={onClick3}>
             {value}
        </button>
    )
}

export default Square;