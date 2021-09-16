import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'

export const BoardLogger = (props) => {

    return (
        <div class="logSection"> 
            <h2>Historico de movimentos</h2>
            <ul>
                {[...props.log].reverse().map((l) => {
                    return <li key={Math.random()}>{`${l.message},  col  ${l.col},  row  ${l.row}`}</li>
                })}
            </ul>
        </div>
    )
}