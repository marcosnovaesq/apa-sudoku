import React, { useEffect, useState } from 'react'
import { solver } from '../utils/solver'
import './board.css'
import { BoardLogger } from './logger'
import { BoardSection } from './section'

export const SudokuBoard = () => {

    const [history, setHistory] =  useState([{col: 1, row: 0, value: 4, message: "unica possibilidade 1"},
    {col: 6, row: 0, value: 5, message: "unica possibilidade 2"},
    {col: 7, row: 0, value: 6, message: "unica possibilidade 3"},
    {col: 1, row: 1, value: 7, message: "unica possibilidade 4"},
    {col: 3, row: 1, value: 8, message: "unica possibilidade 5 "},
    {col: 0, row: 8, value: 9, message: "unica possibilidade 6"},
    {col: 1, row: 0, value: 4, message: "unica possibilidade 1"},
    {col: 6, row: 0, value: 5, message: "unica possibilidade 2"},
    {col: 7, row: 0, value: 6, message: "unica possibilidade 3"},
    {col: 1, row: 1, value: 7, message: "unica possibilidade 4"},
    {col: 3, row: 1, value: 8, message: "unica possibilidade 5 "},
    {col: 0, row: 8, value: 9, message: "unica possibilidade 6"},
    {col: 1, row: 0, value: 4, message: "unica possibilidade 1"},
    {col: 6, row: 0, value: 5, message: "unica possibilidade 2"},
    {col: 7, row: 0, value: 6, message: "unica possibilidade 3"},
    {col: 1, row: 1, value: 7, message: "unica possibilidade 4"},
    {col: 3, row: 1, value: 8, message: "unica possibilidade 5 "},
    {col: 0, row: 8, value: 9, message: "unica possibilidade 6"},
    {col: 1, row: 0, value: 4, message: "unica possibilidade 1"},
    {col: 6, row: 0, value: 5, message: "unica possibilidade 2"},
    {col: 7, row: 0, value: 6, message: "unica possibilidade 3"},
    {col: 1, row: 1, value: 7, message: "unica possibilidade 4"},
    {col: 3, row: 1, value: 8, message: "unica possibilidade 5 "},
    {col: 0, row: 8, value: 9, message: "unica possibilidade 6"}])

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

    // const [puzzle, setPuzzle] = useState([ 
    //     [ 5, 0, 0, 0, 0, 0, 0, 0, 2 ],
    //     [ 6, 0, 8, 2, 0, 3, 1, 0, 7 ],
    //     [ 0, 2, 0, 9, 0, 8, 0, 5, 0 ],
    //     [ 0, 8, 5, 0, 6, 0, 2, 3, 0 ],
    //     [ 0, 0, 0, 3, 0, 5, 0, 0, 0 ],
    //     [ 0, 3, 6, 0, 9, 0, 5, 7, 0 ],
    //     [ 0, 5, 0, 1, 0, 6, 0, 9, 0 ],
    //     [ 9, 0, 1, 8, 0, 4, 3, 0, 5 ],
    //     [ 8, 0, 0, 0, 0, 0, 0, 0, 1 ] 
    // ])

    const [updated, setUpdated] = useState(0)

    const [isCompleted, setIsCompleted] = useState(false)

    const [log, setLog] = useState([])

    const [lastChanged, setLastChanged] = useState()

    function renderBoard(){
        const sections = []
        for(let i = 0; i < 9; i++){
            sections.push(<BoardSection lastChanged={lastChanged} row={i} key={i} sectionValues={puzzle[i]}/>)
        }
        return sections
    }


    // function horizontalBlocks(){
    //     let places = ["top", "bottom", "middle"]
    //     let puzzleCp = [...puzzle]
    //     let pivotRow = 0
    //     for(let i = 1; i<10; i++){
    //         let inNumbersOfRows = 0
    //         let arrPos = []
    //         for(let k = pivotRow; k < pivotRow + 3; k++){
    //             puzzleCp[k].forEach((v, i)=> {
    //                 if(v === i){
    //                     if(i < 3)arrPos.push("top")
    //                 }
    //             })
    //         }
    //     }

    // }

    // solver(puzzle, 9)

    function updateState(currLog){
        setPuzzle((prev)=> {
            let ac = [...prev]
            ac[currLog.row][currLog.col] = currLog.value
            return ac
        })
        setLastChanged({col: currLog.col, row: currLog.row})
        setLog([...log, {...currLog}])
        setUpdated((prev) => (prev+1))
    }

    function updateBoard(){
        if(isCompleted)return
        const currLog = history.pop()
        if(!currLog){
            setIsCompleted(true)
            return
        }
        updateState(currLog)
    }

    useEffect(() => {
        setTimeout(()=> {
            updateBoard()   
        }, 2000)
    }, [updated])


    return (
        <div class="container"> 
            <table id="sudoku">
                <tbody>
                    {renderBoard()}
                </tbody>
            </table>
            <BoardLogger  log={log} />
        </div>
    )
}