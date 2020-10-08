import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import CountryTable from '../countryTable'
import constants from '../../constants'
import darkTheme from '../../theme'
import './main.css'

const { API_ROOT } = constants

export default function Main() {
  const [statistics, setStatistics] = useState()

  useEffect(() => {
    axios.get(`${API_ROOT}/statistics/`)
      .then((response) => {
        const { data } = response.data // This is not a typo, but just the combination of
        // how axios works and our response structure
        setStatistics(data)
      })
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="container">
        <div
          className="tableContainer widget"
          style={{
            backgroundColor: darkTheme.palette.secondary.main,
          }}
        >
          <CountryTable statistics={statistics} />
        </div>
      </div>
    </ThemeProvider>
  )
}
