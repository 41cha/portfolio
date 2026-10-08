import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './styles/tokens.css'
import './styles/components.css'
import './styles/sections.css'
import App from './App.jsx'

// reducedMotion="user": with prefers-reduced-motion, transform/layout
// animations are skipped (opacity fades still run).
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MotionConfig reducedMotion="user">
            <App />
        </MotionConfig>
    </StrictMode>,
)