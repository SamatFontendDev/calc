import { useUnit } from 'effector-react'
import React from 'react'
import styled from 'styled-components'
import { $firstValue, $operation, $result, $secondValue } from '../../store'

const Content = styled.div<{ border: string }>`
    background: rgb(239 15 41 / 30%);
    width: 150px;
    border: ${props => props.border};
    padding: 10px;
    @media (prefers-color-scheme: dark) {
        background: black;
        color: #fff;
    }
`
interface Props {
    active: boolean
}

const Display: React.FC<Props> = props => {
    const { active } = props
    const firstValue = useUnit($firstValue)
    const operation = useUnit($operation)
    const secondValue = useUnit($secondValue)
    const result = useUnit($result)
    return (
        <Content border={active ? '2px solid orange' : '2px solid transparent'}>
            {firstValue && <div>{firstValue}</div>}
            {operation && <div>{operation}</div>}
            {secondValue && <div>{secondValue}</div>}
            {result && (
                <div>
                    = <br /> {result}
                </div>
            )}
        </Content>
    )
}

export default Display
