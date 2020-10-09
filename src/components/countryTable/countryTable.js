import { toPairs, values } from 'lodash'
import React, { useMemo } from 'react'
import { CircularProgress } from '@material-ui/core'
import Table from '../table'

function transformStatisticsToTableData(statistics) {
  const totalInCategoryByCountry = {
  }

  for (const [categoryName, categoryStats] of toPairs(statistics)) {
    for (const [countryName, countryStats] of toPairs(categoryStats)) {
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
      },
      {
        Header: 'Recovered',
        accessor: 'recovered',
      },
      {
        Header: 'Deaths',
        accessor: 'deaths',
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
  if (!statistics) return <CircularProgress color="secondary" />

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
