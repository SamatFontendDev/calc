import styled from 'styled-components'
import Button from './components/Button'
import Display from './components/Display'
import React, { useState } from 'react'
import History from './components/History'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
`

const Container = styled.div`
    display: flex;
`

const Numbers = styled.div`
    background: grey;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 150px;
    @media (prefers-color-scheme: dark) {
        background: black;
    }
`

const numbers = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    '+',
    '*',
    '-',
    '/',
    '=',
    '.',
    'C'
]

const App: React.FC = () => {
    const [activeDisplay, setActiveDisplay] = useState<boolean>(false)
    const changeActiveDisplay = (val: boolean) => setActiveDisplay(val)

    return (
        <Wrapper>
            <Container>
                <Numbers>
                    {numbers.map((el: number | string) => (
                        <Button
                            key={el}
                            changeActiveDisplay={changeActiveDisplay}
                            content={el}
                        />
                    ))}
                </Numbers>
                <Display active={activeDisplay} />
            </Container>
            <History />
        </Wrapper>
    )
}

export default App
