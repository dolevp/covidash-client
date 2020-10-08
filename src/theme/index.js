import { createMuiTheme } from '@material-ui/core/styles'

const darkTheme = createMuiTheme({
  spacing: 6,
  palette: {
    type: 'dark',
    primary: {
      main: '#262B4A',
    },
    background: {
      default: '#1E203A',
    },
  },
})

export default darkTheme
