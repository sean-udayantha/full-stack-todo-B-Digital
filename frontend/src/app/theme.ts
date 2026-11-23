import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#27634f', dark: '#153e35', light: '#c5eab9' },
    secondary: { main: '#6b8b55' },
    background: { default: '#f5f7f5', paper: '#ffffff' },
    text: { primary: '#253a34', secondary: '#687561' },
    divider: '#e3e9e2',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '2.75rem', fontWeight: 600, letterSpacing: '-0.04em' },
    h2: { fontSize: '1.35rem', fontWeight: 600 },
    h3: { fontSize: '1rem', fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 500 },
    overline: { letterSpacing: '0.12em', fontWeight: 500 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { minHeight: 42 } } },
    MuiTextField: { defaultProps: { fullWidth: true, variant: 'outlined' } },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiCard: { defaultProps: { variant: 'outlined' } },
    MuiDialog: { defaultProps: { fullWidth: true, maxWidth: 'sm' } },
  },
});
