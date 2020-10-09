import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Box, LinearProgress } from '@material-ui/core'
import { keys, values, toPairs } from 'lodash'
import numberWithCommas from '../../utils'
import './dataGraph.css'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

const GRAPH_FONT_COLOR = 'rgba(255, 255, 255, 0.2)'

export default function DataGraph({ statistics }) {
  const [country, setCountry] = useState('Australia')

  if (!statistics) return <LinearProgress color="secondary" />

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
      borderColor: 'rgba(75, 192, 192, 1)',
      label: '# of Cases',
    },
    recovered: {
      borderColor: 'rgba(99, 255, 70, 1)',
      label: '# of Recoveries',
    },
    deaths: {
      borderColor: 'rgba(255, 99, 132, 1)',
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
      callbacks: {
        label(tooltipItem, graph) {
          const value = graph.datasets[0].data[tooltipItem.index]
          return numberWithCommas(value)
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
