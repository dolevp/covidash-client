import React from 'react'
import { Box, Grid, useTheme } from '@material-ui/core'
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons'
import { values, indexOf } from 'lodash'
import './compactInformation.css'
import { numberWithCommas } from '../../utils'

const COMPARE_TO_X_DAYS_BEFORE = 1
const DIFF_LABEL = 'Since yesterday'

export default function CompactInformation({
  countByDate, reverseDirection, countFromToday, previousCount, suffix = '',
}) {
  const theme = useTheme()
  const { common: { red, green } } = theme.palette
  const counts = values(countByDate)
  countFromToday = countFromToday || Math.max(...counts)
  previousCount = previousCount || counts[
    indexOf(counts, countFromToday) - COMPARE_TO_X_DAYS_BEFORE
  ]

  const decreaseValue = countFromToday - previousCount
  const diffPercentage = previousCount && previousCount !== 'NaN' ? (decreaseValue / previousCount) * 100 : 0

  const hasDecreased = diffPercentage < 0

  const getDifferenceColor = () => {
    if (reverseDirection) {
      return hasDecreased ? green : red
    }
    return hasDecreased ? red : green
  }

  const color = getDifferenceColor()
  const ArrowComponent = diffPercentage >= 0 ? ArrowDropUp : ArrowDropDown
  const diffLabel = diffPercentage ? `${diffPercentage.toFixed(2)}%` : ''

  return (
    <Box ml={3} className="compact-information-container">
      <h1 className="compact-information-text">
        {numberWithCommas(countFromToday)}
        {suffix}
      </h1>

      {Boolean(diffPercentage) && (
      <>
        <Grid container pt={3} alignItems="center" justifyContent="center">
          <Grid item xs={1} className="arrow-diff-grid-item">
            <ArrowComponent style={{ color }} />
          </Grid>
          <Grid item xs={1}>
            <text
              className="difference-text"
              style={{ color, display: 'inline' }}
            >
              {diffLabel}
            </text>
          </Grid>
        </Grid>
        <Box pt={1}>
          <text className="compact-time-text">
            {DIFF_LABEL}
          </text>
        </Box>
      </>
      )}
    </Box>
  )
}
