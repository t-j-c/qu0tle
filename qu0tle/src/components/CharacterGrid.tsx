import ToggleButton from '@mui/material/ToggleButton';
import React from 'react';
import styles from '@/styles/Home.module.css'

export interface CharacterGridProps {
    readonly phrase: string;
    readonly onSwap: ((newValue: string) => void);
    readonly matched: boolean;
}

const CharacterGrid = (props: CharacterGridProps) => {
    const cellSize = 50
    const gridWidth = Math.sqrt(props.phrase.length);
    const [selected, setSelected] = React.useState(-1);

    function handleButtonChange(cellNumber: number) {
        if (selected == -1) {
            setSelected(cellNumber)
        }
        else if (selected == cellNumber) {
            setSelected(-1)
        }
        else {
            let first = cellNumber < selected ? cellNumber -1 : selected -1
            let last = cellNumber < selected ? selected -1 : cellNumber -1
            let str = props.phrase
            props.onSwap(str.substring(0, first)
                + str[last]
                + str.substring(first+1, last)
                + str[first]
                + str.substring(last+1));

            setSelected(-1)
        }
    }

    return (
        <div className="container" style={{ height: cellSize * gridWidth }}>
            {Array(gridWidth).fill(undefined).map((_, i) =>
                <div key={i} className="row" style={{ width: cellSize * gridWidth }}>
                    {Array(gridWidth).fill(undefined).map((_, j) => {
                        const cellNumber = (i * gridWidth) + (j + 1)
                        return (
                            <ToggleButton key={cellNumber} value={cellNumber} size="large"
                                selected={selected == cellNumber} color="primary"
                                className={`${styles.cell} col ${props.matched ? styles.matched : ''}`} 
                                onChange={() => handleButtonChange(cellNumber)}>
                                {props.phrase[cellNumber-1]}
                            </ToggleButton>)
                    })}
                </div>
            )}
        </div>
    )
}

export default CharacterGrid