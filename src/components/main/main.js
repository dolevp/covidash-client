import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Select from 'react-select'
import CountryTable from '../countryTable'
import DataGraph from '../dataGraph'
import constants from '../../constants'
import darkTheme from '../../theme'
import './main.css'
import { BigWidget, SmallWidget } from '../widgets'

const { API_ROOT } = constants

const options = [
  {
    value: 'chocolate', label: 'Chocolate',
  },
  {
    value: 'strawberry', label: 'Strawberry',
  },
  {
    value: 'vanilla', label: 'Vanilla',
  },
]

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
      <Box m={3} ml={6} pt={2} className="app-header">
        <h1 className="app-title">covidash</h1>
        {/* <Select options={options} /> */}
      </Box>
      <Box>
        <Box className="widget-row" m={3}>
          <Box className="widget-grid" flex={2}>
            <SmallWidget />
            <SmallWidget />
            <SmallWidget />
            <SmallWidget />
          </Box>
          <BigWidget flex={3} title="Reported data over time">
            <DataGraph statistics={statistics} />
          </BigWidget>
        </Box>
        <Box className="widget-row" m={3}>
          <BigWidget
            mt={0}
            title="Worst performing countries"
          >
            <CountryTable statistics={statistics} />
          </BigWidget>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
