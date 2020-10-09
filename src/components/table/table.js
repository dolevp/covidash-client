import React from 'react'

import MaUTable from '@material-ui/core/Table'
import { TableSortLabel,
  TableBody,
  TableFooter,
  TableHead,
  TableRow } from '@material-ui/core'
import { usePagination,
  useSortBy,
  useTable } from 'react-table'
import './table.css'
import TablePaginationActions from './tablePaginationActions'
import { StyledCell, StyledHeaderCell, StyledPagination, StyledTableContainer } from './styled'

export default function Table({ columns, data, useTableExtraProps }) {
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
      ...useTableExtraProps,
    },
    useSortBy,
    usePagination,

  )

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage)
  }

  return (
    <StyledTableContainer>
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
                {row.cells.map((cell) => (
                  <StyledCell {...cell.getCellProps()}>
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
