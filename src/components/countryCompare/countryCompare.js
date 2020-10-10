import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Box } from '@material-ui/core'
import {
  keys, toPairs, values, uniq,
} from 'lodash'
import randomColor from 'randomcolor'
import ContentLoader, {} from 'react-content-loader'
import { numberWithCommas } from '../../utils'
import { baseLegend, baseTooltip } from '../../theme'

const CHART_FONT_COLOR = 'rgba(255, 255, 255, 0.6)'

function generateColorStack() {
  return randomColor({
    count: 200,
    luminosity: 'light',
    format: 'rgba',
    hue: 'blue',
    alpha: 0.6,
  })
}
const colorByCountry = {}
const colorStack = generateColorStack()

const chartOptions = {
  animation: {
    duration: 2000,
  },
  responsive: true,
  maintainAspectRatio: true,
  tooltips: {
    ...baseTooltip,
    callbacks: {
      label(tooltipItem, graph) {
        const dataset = graph.datasets[tooltipItem.datasetIndex]
        const value = numberWithCommas(dataset.data[tooltipItem.index])
        return `${dataset.label}: ${value} `
      },
    },
  },
  scales: {
    yAxes: [{
      gridLines: {
        color: 'rgba(255, 255, 255, 0.08)',
      },
      ticks: {
        fontSize: 14,
        fontColor: CHART_FONT_COLOR,
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
        fontSize: 14,
        fontColor: CHART_FONT_COLOR,
      },
    }],
  },
  legend: {
    labels: {
      fontColor: CHART_FONT_COLOR,
      fontSize: 14,
    },
  },
}

export default function CountryCompare({ country, selectedCountries, statistics }) {
  const baseDataset = {
    radius: 6,
    pointRadius: 6,
    pointBorderWidth: 3,
    pointBackgroundColor: 'transparent',

  }
  const dataLabels = {
    confirmed: {
      label: 'Cases',
    },
    recovered: {
      label: 'Recoveries',
    },
    deaths: {
      label: 'Deaths',
    },
    fatalityRate: {
      calculated: true,
      label: 'Fatality Rate',
    },

  }

  const countriesToCompare = uniq([country, 'Global', ...selectedCountries])

  const buildDatasetFromCountry = (countryName) => {
    {
      colorByCountry[countryName] = colorByCountry[countryName] || colorStack.pop()
      const baseData = keys(dataLabels)
        .filter((key) => !dataLabels[key].calculated)
        .map((datasetName) => (
          Math.max(...values(statistics[datasetName][countryName]))
        ))
      const fatalityRate = baseData[0] ? (baseData[2] / baseData[0]) * 100 : null
      return {
        ...baseDataset,
        label: countryName,
        borderColor: colorByCountry[countryName],
        backgroundColor: colorByCountry[countryName],
        data: [...baseData, fatalityRate?.toFixed(2)],
      }
    }
  }
  const data = {
    labels: toPairs(dataLabels).map(([datasetName, datasetSettings]) => datasetSettings.label),
    datasets: countriesToCompare.map(buildDatasetFromCountry),
  }
  return (
    <Box display="flex" alignItems="center" height="90%">
      <Bar
        height="70%"
        width="100%"
        data={data}
        options={chartOptions}
      />
    </Box>
  )
}
