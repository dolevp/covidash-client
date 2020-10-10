import { toPairs, values } from 'lodash'
import React, { useMemo } from 'react'
import Table from '../table'
import { numberWithCommas } from '../../utils'

const IGNORED_COUNTRY_NAMES = ['Global']

function transformStatisticsToTableData(statistics) {
  const totalInCategoryByCountry = {
  }

  for (const [categoryName, categoryStats] of toPairs(statistics)) {
    const filteredCountryStats = toPairs(categoryStats).filter(
      ([countryName, _]) => !IGNORED_COUNTRY_NAMES.includes(countryName),
    )

    for (const [countryName, countryStats] of filteredCountryStats) {
      totalInCategoryByCountry[countryName] = totalInCategoryByCountry[countryName] || {
      }
      totalInCategoryByCountry[countryName][categoryName] = Math.max(...values(countryStats))
    }
  }
  // Now we have something like { Israel: { recovered: 100, deaths: 0, confirmed: 100 } }
  // which we want to convert to [{ country: Israel, recovered: 100, deaths: 0, confirmed: 100 }]
  return Object.entries(totalInCategoryByCountry)
    .map(([countryName, stats]) => ({
      countryName, ...stats,
    }))
}

export default function CountryTable({ statistics }) {
  const data = useMemo(
    () => transformStatisticsToTableData(statistics),
    [statistics],
  )
  const columns = useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'countryName', // accessor is the "key" in the data
      },
      {
        Header: 'Cases',
        accessor: 'confirmed',
        Cell: (props) => numberWithCommas(props.value),
      },
      {
        Header: 'Recovered',
        accessor: 'recovered',
        Cell: (props) => numberWithCommas(props.value),
      },
      {
        Header: 'Deaths',
        accessor: 'deaths',
        Cell: (props) => numberWithCommas(props.value),
      },
    ],
    [],
  )
  const initialState = {
    sortBy: [
      {
        id: 'confirmed',
        desc: true,
      },
    ],
  }

  return (
    <Table
      columns={columns}
      data={data}
      useTableExtraProps={{
        initialState,
      }}
    />
  )
}
