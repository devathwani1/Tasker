import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SizeProvider} from './providers/ScreenSize.tsx'
import { AddTaskProvider } from './providers/Contexts.tsx'
createRoot(document.getElementById('root')!).render(
    <SizeProvider>
        <AddTaskProvider>
    <App />
    </AddTaskProvider>
    </SizeProvider>
)
