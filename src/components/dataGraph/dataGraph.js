import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Box, LinearProgress, useTheme } from '@material-ui/core'
import { keys, values, toPairs } from 'lodash'
import { numberWithCommas } from '../../utils'
import './dataGraph.css'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

const GRAPH_FONT_COLOR = 'rgba(255, 255, 255, 0.2)'

export default function DataGraph({ statistics, country }) {
  const theme = useTheme()
  const { common: colors } = theme.palette

  const datasetBase = {
    backgroundColor: [
      'transparent',
    ],
    borderWidth: 2,
    pointStrokeColor: 'transparent',
    pointColor: 'transparent',
    pointRadius: 0,
    pointHitRadius: 10,
  }

  const statCategories = {
    confirmed: {
      borderColor: colors.blue,
      label: '# of Cases',
    },
    recovered: {
      borderColor: colors.green,
      label: '# of Recoveries',
    },
    deaths: {
      borderColor: colors.red,
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
    tooltips: {
      intersect: false,
      mode: 'index',
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
          beginAtZero: true,
          responsive: true,
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
        },
      }],
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
