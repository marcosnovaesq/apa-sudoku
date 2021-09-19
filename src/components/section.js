import React from 'react'
import { BoardCell } from './cell'

export const BoardSection = (props) => {
    function renderCells(){
        const cells = []
        for(let i = 0; i< 9; i++){
            cells.push(<BoardCell key={i} row={props.row} col={i} log={props.log}  value={props.sectionValues[i]} prefilled={props.sectionValues[i] !== 0} />) 
        }
        return cells
    }

    return (
        <tr>
            {renderCells()}
        </tr>
    )
}