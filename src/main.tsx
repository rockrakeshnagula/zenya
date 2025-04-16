import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'

// Initialize storage
import { initializeLocalStorage } from './utils/storage'
initializeLocalStorage()

// Add gradient CSS variables directly
document.documentElement.style.setProperty('--gradient-primary', 'rgba(86, 87, 246, 0.3)')
document.documentElement.style.setProperty('--gradient-secondary', 'rgba(152, 129, 252, 0.2)')
document.documentElement.style.setProperty('--gradient-tertiary', 'rgba(47, 162, 224, 0.1)')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#151518', // Updated to match dark theme
          color: '#FFFFFF',
          border: '1px solid #232329',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          padding: '12px 16px',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#5657F6', // Updated to match Linear theme
            secondary: '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FFFFFF',
          },
        },
      }}
    />
  </BrowserRouter>
)