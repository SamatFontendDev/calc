import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { fork } from 'effector'
import { Provider } from 'effector-react'
import './fonts/Roboto.ttf'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const scope = fork()

root.render(
    <Provider value={scope}>
        <App />
    </Provider>
)
