import { useUnit } from 'effector-react'
import { $history, addHistory } from '../../store'
import { useState } from 'react'
import styled from 'styled-components'

const Button = styled.span`
    font-size: 18px;
    border-bottom: 1px solid black;
    cursor: pointer;
    margin-top: 10px;
`

const History: React.FC = () => {
    const [list, setList] = useUnit([$history, addHistory])
    const [showHistory, setShowHistory] = useState<boolean>(false)

    return (
        <>
            <Button onClick={() => setShowHistory(!showHistory)}>
                {showHistory ? 'Hide history' : 'Show history'}
            </Button>
            {showHistory && (
                <ul>
                    {list.map((el: string, index) => (
                        <li>{el}</li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default History
