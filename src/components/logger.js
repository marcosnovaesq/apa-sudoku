import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'

export const BoardLogger = (props) => {
    const [logs, setLogs] = useState([])

    useEffect(()=> {
        setLogs((prev)=> {
            prev.push(props.log)
            return prev
        })
    }, [props.log])

    return (
        <div className="logSection"> 
            <h2>Historico de movimentos</h2>
            <ul>
                {logs.reverse().map((l) => {
                    return <li key={Math.random()}>{`${l.message}`}</li>
                })}
            </ul>
        </div>
    )
}