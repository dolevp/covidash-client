import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, LinearProgress, CircularProgress } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import CountryTable from '../countryTable'
import constants from '../../constants'
import darkTheme from '../../theme'
import './main.css'
import DataGraph from '../dataGraph'

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
      <Box>
        <Box className="widget-row" m={3}>
          <Box className="widget-grid" flex={3}>
            <Box
              bgcolor="primary.main"
              className="square-widget"
              m={3}
            />
            <Box
              bgcolor="primary.main"
              className="square-widget"
              m={3}
            />
            <Box
              bgcolor="primary.main"
              className="square-widget"
              m={3}
            />
            <Box
              bgcolor="primary.main"
              className="square-widget"
              m={3}
            />
          </Box>
          <Box className="big-widget" flex={5.6} m={3} bgcolor="primary.main">
            <DataGraph />
          </Box>
        </Box>
        <Box className="widget-row" m={3}>
          <Box
            className="table-container big-widget"
            bgcolor="primary.main"
            ml={3}
          >
            {statistics
              ? <CountryTable statistics={statistics} />
              : <CircularProgress color="secondary" />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
