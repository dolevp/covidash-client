import { Box } from '@material-ui/core'
import React from 'react'

function Widget({ children, title, ...props }) {
  return (
    <Box
      bgcolor="primary.main"
      p={4}
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

export function SmallWidget({ children, ...props }) {
  return (
    <Widget className="small-widget" {...props}>
      {children}
    </Widget>
  )
}

export function MediumWidget({ children, ...props }) {
  return (
    <Widget mb={3} m={0} className="medium-widget" {...props}>
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
