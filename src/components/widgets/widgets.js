import { Box } from '@material-ui/core'
import React from 'react'

function Widget({ children, title, ...props }) {
  return (
    <Box
      bgcolor="primary.main"
      m={3}
      {...props}
    >
      <Box ml={3}>
        <h2 className="widget-title">
          {title}
        </h2>
      </Box>
      {children}
    </Box>
  )
}

export function SquareWidget({ children, ...props }) {
  return (
    <Widget m="auto" className="square-widget" {...props}>
      {children}
    </Widget>
  )
}

export function BigWidget({ children, ...props }) {
  return (
    <Widget className="big-widget" {...props}>
      {children}
    </Widget>
  )
}
