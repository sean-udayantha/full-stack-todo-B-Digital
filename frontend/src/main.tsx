import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './app/theme';
// import './index.css'
import { store } from './app/store'
import { TodosPage } from './pages/TodosPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <TodosPage />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
