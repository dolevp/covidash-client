import { createMuiTheme } from '@material-ui/core/styles'

const darkTheme = createMuiTheme({
  spacing: 6,
  palette: {
    type: 'dark',
    primary: {
      main: '#262B4A',
    },
    secondary: {
      main: '#F42F56',
    },
    background: {
      default: '#1E203A',
    },
  },
})

export default darkTheme
