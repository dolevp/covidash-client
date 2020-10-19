import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Box, useTheme } from '@material-ui/core'
import { keys, values, toPairs } from 'lodash'
import { numberWithCommas } from '../../utils'
import './dataGraph.css'
import { baseTooltip } from '../../theme'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

const GRAPH_FONT_COLOR = 'rgba(255, 255, 255, 0.4)'

export default function DataGraph({ statistics, country }) {
  const theme = useTheme()
  const { common: colors } = theme.palette

  const datasetBase = {
    borderWidth: 2,
    pointStrokeColor: 'transparent',
    pointColor: 'transparent',
    pointRadius: 0,
    pointHitRadius: 10,
    fill: false,
  }

  const statCategories = {
    confirmed: {
      borderColor: colors.blue,
      backgroundColor: colors.blue,
      label: '# of Cases',
    },
    recovered: {
      borderColor: colors.green,
      backgroundColor: colors.green,
      label: '# of Recoveries',
    },
    deaths: {
      borderColor: colors.red,
      backgroundColor: colors.red,
      label: '# of Deaths',
    },
  }

  const data = {
    labels: keys(statistics.confirmed[country]).map(formatDate),
    datasets: toPairs(statCategories).map(([datasetName, datasetSettings]) => ({
      ...datasetBase,
      ...datasetSettings,
      data: values(statistics[datasetName][country]),
    })),
  }

  const lineChartOptions = {
    animation: {
      duration: 1500,
    },
    tooltips: {
      ...baseTooltip,
      callbacks: {
        label(tooltipItem, graph) {
          const dataset = graph.datasets[tooltipItem.datasetIndex]
          const dataLabel = dataset.label.replace('# of', '')
          const value = numberWithCommas(dataset.data[tooltipItem.index])
          return value + dataLabel
        },
      },
    },
    scales: {
      yAxes: [{
        gridLines: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          fontColor: GRAPH_FONT_COLOR,
          fontSize: 14,
          beginAtZero: true,
          callback(value) {
            return numberWithCommas(value)
          },
        },
      }],
      xAxes: [{
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: GRAPH_FONT_COLOR,
          fontSize: 14,
        },
      }],
    },
    legend: {
      labels: {
        fontColor: GRAPH_FONT_COLOR,
        fontSize: 14,
      },
    },
  }

  return (
    <Box>
      <Line
        data={data}
        options={lineChartOptions}
      />
    </Box>
  )
}
