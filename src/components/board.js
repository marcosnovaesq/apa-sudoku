import React, { useEffect, useState } from 'react'
import { solver } from '../utils/solver'
import './board.css'
import { BoardLogger } from './logger'
import { BoardSection } from './section'

export const SudokuBoard = () => {
    const board = [ 
        [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
        [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
        [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
        [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
        [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
        [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
        [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] 
    ]
    
    const [puzzle, setPuzzle] = useState([ 
        [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
        [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
        [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
        [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
        [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
        [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
        [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] 
    ])

    const [finished, setFinished] = useState(false)

    const [log, setLog] = useState({type: "LOG", message: "inicio"})

    const [intervalID, setIntervalID] = useState()

    function renderBoard(){
        const sections = []
        for(let i = 0; i < 9; i++){
            sections.push(<BoardSection row={i} log={log}  sectionValues={puzzle[i]}/>)
        }
        return sections
    }

    function updateState(currLog){
        setPuzzle((prev)=> {
            let ac = [...prev]
            ac[currLog.row][currLog.col] = currLog.value
            return ac
        })
    }


    useEffect(() => {
        const boardLog = solver(board, 9)
        if(boardLog){
            setIntervalID(
                setInterval(()=> {
                    let currLog = boardLog.shift()
                    if(!currLog){
                        setFinished(true)
                        return
                    }
                    if(currLog.type === "CHANGE" || currLog.type === "BACKTRACK"){
                        updateState(currLog)
                    }
                    setLog(currLog)
                }, 100)
            )
        }
    }, [])

    useEffect(() => {
        if(finished){
            clearInterval(intervalID)
        }
    }, [finished])

    return (
        <div className="container"> 
            <table id="sudoku">
                <tbody>
                    {renderBoard()}
                </tbody>
            </table>
            <BoardLogger  log={log} />
        </div>
    )
}