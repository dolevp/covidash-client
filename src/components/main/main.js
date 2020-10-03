import React, { useEffect, useState } from 'react'
import './main.css'
import axios from 'axios'
import CountryTable from '../countryTable'
import constants from '../../constants'

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
    <div className="container">
      <header className="app-header">
        <h2 className="title">
          <CountryTable statistics={statistics} />
        </h2>
      </header>
    </div>
  )
}
