import React from 'react'

import MaUTable from '@material-ui/core/Table'
import {
  TableSortLabel,
  Box,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  IconButton,
} from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import {
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'
import './table.css'
import { without } from 'lodash'
import TablePaginationActions from './tablePaginationActions'
import {
  StyledCell, StyledHeaderCell, StyledPagination, StyledTableContainer,
} from './styled'
import { numberWithCommas } from '../../utils'

export default function Table({
  columns, data, selectedCountries, setSelectedCountries, ...props
}) {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      ...props,
    },
    useSortBy,
    usePagination,

  )

  const handleCountrySelect = (e, countryName) => {
    if (e.target.checked) {
      setSelectedCountries([...selectedCountries, countryName])
    } else {
      setSelectedCountries(without(selectedCountries, countryName))
    }
  }

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage)
  }

  const transformCellValue = (cell) => (
    {
      ...cell, value: numberWithCommas(cell.value),
    }
  )

  return (
    <StyledTableContainer>
      {selectedCountries?.length > 0 && (
      <Box className="select-text-container">
        <Typography
          display="inline"
          color="inherit"
          variant="subtitle1"
          style={{ float: 'left' }}
        >
          {' ('}
          {selectedCountries.length}
          {' '}
          selected)
        </Typography>
        <IconButton aria-label="delete" color="inherit" onClick={() => { setSelectedCountries([]) }}>
          <HighlightOff />
        </IconButton>
      </Box>
      )}
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <StyledHeaderCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <TableSortLabel
                    active={column.isSorted}
                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                  />
                </StyledHeaderCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(transformCellValue).map((cell, i) => (
                  <StyledCell {...cell.getCellProps()}>
                    {i === 0 && (
                    <Checkbox
                      checked={selectedCountries.includes(cell.value)}
                      onChange={(e) => { handleCountrySelect(e, cell.value) }}
                    />
                    )}
                    {cell.render('Cell')}
                  </StyledCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <StyledPagination
              labelRowsPerPage={null}
              colSpan={1}
              count={data.length}
              rowsPerPage={10}
              page={pageIndex}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </StyledTableContainer>
  )
}
