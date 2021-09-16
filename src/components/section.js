import React from 'react'
import { render } from 'react-dom'
import { BoardCell } from './cell'

export const BoardSection = (props) => {
    function renderCells(){
        const cells = []
        for(let i = 0; i< 9; i++){
            cells.push(<BoardCell lastChanged={props.lastChanged} row={props.row} col={i} key={i} value={props.sectionValues[i]} prefilled={props.sectionValues[i] !== 0} />) 
        }
        return cells
    }

    return (
        <tr>
            {renderCells()}
        </tr>
    )
}