import { createMuiTheme } from '@material-ui/core/styles'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    secondary: {
      main: '#262B4A',
    },
    background: {
      default: '#1E203A',
    },
  },
})

export default darkTheme
