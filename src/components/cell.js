import React, { useState } from 'react'

export const BoardCell = (props) => {
    const [prefilled, setPrefilled] = useState(props.value !== 0)
    console.log(props)

    // let color = 'white'


    // function color(){
    let color = 'white'
    let fontColor = "black"
    if(props.log.row === props.row && props.log.col === props.col){
        if(props.log && props.log.type === "CHANGE" ){
            fontColor = "white"
            color = "green"
        }
        if(props.log && props.log.type === "BACKTRACK" ){
            fontColor = "white"
            color = "red"
        }

    }

    console.info(color, props.row, props.col)
        // return color 
    // }

    return (<td ><input style={{backgroundColor: color, color: fontColor, fontSize: "25px"}} type="text"  value={props.value} disabled={prefilled}/></td>)
}