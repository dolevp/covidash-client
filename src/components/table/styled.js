import { TableCell, TableContainer, TablePagination, withStyles } from '@material-ui/core'

export const StyledTableContainer = withStyles({
  root: {
    overflow: 'visible',
  },
})(TableContainer)

export const StyledPagination = withStyles({
  selectRoot: {
    display: 'none',
  },
})(TablePagination)

export const StyledHeaderCell = withStyles({
  root: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
    fontWeight: '900',
  },
})(TableCell)

export const StyledCell = withStyles({
  root: {
    borderBottom: '1px solid rgba(81, 81, 81, 0.4)',
  },
})(TableCell)
