import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, CircularProgress, useTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { indexOf, keys, values } from 'lodash'
import Select from 'react-select'
import CountryTable from '../countryTable'
import DataGraph from '../dataGraph'
import constants from '../../constants'
import darkTheme from '../../theme'
import './main.css'
import { BigWidget, MediumWidget, SmallWidget } from '../widgets'
import CompactInformation from '../compactInformation'
import { latestDataFromStatistics } from '../../utils'
import CountrySelect from '../countrySelect'
import CountryCompare from '../countryCompare'

const { API_ROOT } = constants

function setCountryFromIP(statisticsData, setCountry) {
  return axios.get('https://ipapi.co/json/')
    .then((response) => {
      const { data } = response
      const { country_name: countryName, country: countryShort } = data

      if (statisticsData.confirmed[countryName]) {
        setCountry(countryName)
      } else if (statisticsData.confirmed[countryShort]) {
        setCountry(countryShort)
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export default function Main() {
  const [selectedCountries, setSelectedCountries] = useState([])
  const [statistics, setStatistics] = useState()
  const [country, setCountry] = useState('Global')

  useEffect(() => {
    axios.get(`${API_ROOT}/statistics/`)
      .then((response) => {
        const { data } = response.data // This is not a typo, but just the combination of
        // how axios works and our response structure
        setCountryFromIP(data, setCountry).then(() => {
          setStatistics(data)
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const getLastWeekFatalityRate = () => {
    const confirmedStatistics = statistics.confirmed[country]
    const casesUpToNow = latestDataFromStatistics(confirmedStatistics)
    const casesUpToLastWeek = values(confirmedStatistics)[
      indexOf(values(confirmedStatistics), casesUpToNow) - 7
    ]

    const deathStatistics = statistics.deaths[country]
    const deathsUpToNow = latestDataFromStatistics(deathStatistics)
    const deathsUpToLastWeek = values(deathStatistics)[
      indexOf(values(deathStatistics), deathsUpToNow) - 7
    ]

    const percentage = (deathsUpToLastWeek / casesUpToLastWeek) * 100
    return percentage.toFixed(2)
  }

  const getCurrentFatalityRate = () => {
    const casesUpToNow = latestDataFromStatistics(statistics.confirmed[country])
    const deathsUpToNow = latestDataFromStatistics(statistics.deaths[country])

    const percentage = (deathsUpToNow / casesUpToNow) * 100
    return percentage.toFixed(2)
  }

  const countryOptions = keys(statistics?.confirmed).map((countryName) => ({
    value: countryName,
    label: countryName,
  }))

  const handleCountryChange = (option) => {
    setCountry(option.value)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box m={3} ml={6} pt={2} flexDirection="row" flex={1} display="flex" alignItems="space-between" justifyContent="space-between">
        <h1 className="app-title">covidash</h1>
        {statistics && (
        <CountrySelect
          countryOptions={countryOptions}
          handleChange={handleCountryChange}
          selectedCountry={country}
        />
        )}
      </Box>
      {statistics ? (
        <Box>
          <Box className="widget-row" m={3}>
            <Box className="widget-grid" flex={2}>
              <SmallWidget title="Total Cases">
                <CompactInformation countByDate={statistics.confirmed[country]} />
              </SmallWidget>
              <SmallWidget title="Recovered">
                <CompactInformation countByDate={statistics.recovered[country]} biggerIsBetter />
              </SmallWidget>
              <SmallWidget title="Deaths">
                <CompactInformation countByDate={statistics.deaths[country]} />
              </SmallWidget>
              <SmallWidget title="Fatality Rate">
                <CompactInformation
                  suffix="%"
                  countFromToday={getCurrentFatalityRate()}
                  countFromLastWeek={getLastWeekFatalityRate()}
                />
              </SmallWidget>
            </Box>
            <BigWidget flex={3} title="Reported data over time">
              <DataGraph country={country} statistics={statistics} />
            </BigWidget>
          </Box>
          <Box className="widget-row" m={3} overflow="hidden">
            <BigWidget
              overlow="hidden"
              flex={2}
              mt={0}
              title="Select & compare"
            >
              <CountryCompare
                country={country}
                selectedCountries={selectedCountries}
                statistics={statistics}
              />
            </BigWidget>
            <MediumWidget
              mr={3}
              ml={3}
              title="Worst performing countries"
            >
              <CountryTable
                statistics={statistics}
                selectedCountries={selectedCountries}
                setSelectedCountries={setSelectedCountries}
              />
            </MediumWidget>
          </Box>
        </Box>
      )
        : (
          <Box className="loading-container">
            <CircularProgress size={100} />
          </Box>
        )}
    </ThemeProvider>
  )
}
