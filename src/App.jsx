import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './store'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
