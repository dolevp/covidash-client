import { createMuiTheme } from '@material-ui/core/styles'

const darkTheme = createMuiTheme({
  spacing: 6,
  palette: {
    type: 'dark',
    common: {
      white: '#fff',
      red: 'rgb(255, 99, 132)',
      green: 'rgb(99, 255, 70)',
      blue: 'rgb(75, 192, 192)',
    },
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

export const baseTooltip = {
  position: 'nearest',
  intersect: false,
  mode: 'index',
  titleFontColor: '#212121',
  bodyFontColor: '#212121',
  backgroundColor: 'white',
  titleFontSize: 16,
  bodyFontSize: 16,
}
export default darkTheme
