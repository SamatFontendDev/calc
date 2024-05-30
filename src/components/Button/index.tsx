import styled from 'styled-components'
import {
    changeFirstValue,
    $firstValue,
    changeOperation,
    $operation,
    $secondValue,
    changeSecondValue,
    $result,
    createResult,
    clearCalc,
    $history,
    addHistory
} from '../../store'
import { useUnit } from 'effector-react'

const Wrapper = styled.div<{ active: string }>`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: grey;
    cursor: pointer;
    transition: 0.2s all;
    &:active {
        background: ${props => props.active};
        transform: scale(0.9);
        @media (prefers-color-scheme: dark) {
            background: black;
        }
    }
    @media (prefers-color-scheme: dark) {
        background: black;
    }
`
const Value = styled.span`
    font-size: 20px;
    color: #fff;
`

interface Props {
    content: string | number
    changeActiveDisplay: (val: boolean) => void
}

const Button: React.FC<Props> = props => {
    const { content, changeActiveDisplay } = props
    const [firstVal, changeFirstVal] = useUnit([$firstValue, changeFirstValue])
    const [operation, setOperation] = useUnit([$operation, changeOperation])
    const [secondVal, setSecondVal] = useUnit([$secondValue, changeSecondValue])
    const [result, setResult] = useUnit([$result, createResult])
    const [history, addHistoryItem] = useUnit([$history, addHistory])
    const clear = useUnit(clearCalc)
    const mouseUp = () => {
        if (typeof content === 'number') {
            changeActiveDisplay(false)
        }
    }
    const mouseDown = () => {
        if (typeof content === 'number') {
            changeActiveDisplay(true)
        }
    }

    const clickHandler = () => {
        if (content === 'C') {
            console.log('clear')
            clear()
            return
        }
        if (result) {
            console.log('return')
            return
        }
        if (content === '=' && firstVal && secondVal && operation) {
            setResult()
            addHistoryItem()
            return
        }
        if (
            operation &&
            typeof Number(content) === 'number' &&
            !['+', '*', '-', '/'].includes(String(content))
        ) {
            console.log('second', operation)
            setSecondVal(String(content))
            return
        }
        if (
            typeof Number(content) === 'number' &&
            !['+', '*', '-', '/'].includes(String(content))
        ) {
            console.log('first')
            changeFirstVal(String(content))
            return
        }
        if (['+', '*', '-', '/'].includes(String(content)) && firstVal) {
            console.log('operation')
            setOperation(String(content))
            return
        }
    }

    return (
        <Wrapper
            active={
                content === '+' || content === '*'
                    ? '#dc991f'
                    : content === '-' || content === '/'
                    ? '#2f2fb2'
                    : 'grey'
            }
            onMouseUp={mouseUp}
            onMouseDown={mouseDown}
            onClick={clickHandler}
        >
            <Value>{content}</Value>
        </Wrapper>
    )
}

export default Button
