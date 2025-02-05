import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from "./redux/Store"; // Import from your project's store file;
import { Provider } from 'react-redux'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
     <App />
     <Toaster />
  </Provider>
  </StrictMode>,
)
