import { values } from 'lodash'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function latestDataFromStatistics(countByDate) {
  return Math.max(...values(countByDate))
}
