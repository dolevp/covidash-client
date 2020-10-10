import React from 'react'
import { Box, useTheme } from '@material-ui/core'
import { values, indexOf } from 'lodash'
import './compactInformation.css'
import { numberWithCommas } from '../../utils'

export default function CompactInformation({ countByDate, biggerIsBetter, countFromToday, countFromLastWeek, suffix = '' }) {
  const theme = useTheme()
  const { common: { red, green } } = theme.palette
  const counts = values(countByDate)
  countFromToday = countFromToday || Math.max(...counts)
  countFromLastWeek = countFromLastWeek || counts[indexOf(counts, countFromToday) - 7]

  const decreaseValue = countFromToday - countFromLastWeek
  const diffPercentage = countFromLastWeek && countFromLastWeek !== 'NaN' ? (decreaseValue / countFromLastWeek) * 100 : null

  const hasDecreased = diffPercentage < 0

  const getDifferenceColor = () => {
    if (biggerIsBetter) {
      return hasDecreased ? red : green
    }
    return hasDecreased ? green : red
  }

  return (
    <Box ml={3} className="compact-information-container">
      <h1 className="compact-information-text">
        {numberWithCommas(countFromToday)}
        {suffix}
      </h1>

      {diffPercentage !== null && (
      <>
        <Box pt={3}>
          <text
            className="difference-text"
            style={{
              color: getDifferenceColor(),
            }}
          >
            {diffPercentage >= 0 ? '+' : '' }
            {' '}
            {`${diffPercentage.toFixed(2)}%`}
          </text>
        </Box>
        <Box pt={1}>
          <text className="compact-time-text">
            Since last week
          </text>
        </Box>
      </>
      )}
    </Box>
  )
}
