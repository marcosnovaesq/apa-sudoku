import React, { useState } from 'react'

export const BoardCell = (props) => {
    const [prefilled, setPrefilled] = useState(props.value !== 0)

    function isLastChanged(){
        return props.lastChanged && props.lastChanged.row === props.row && props.lastChanged.col === props.col
    }

    return (<td ><input style={{backgroundColor: isLastChanged() ? "green" :  "white"}} type="text"  value={props.value} disabled={prefilled}/></td>)
}