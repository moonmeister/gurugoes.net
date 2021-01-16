import * as React from "react"

import { graphql } from "gatsby"

import { formatDate, durationFromTime } from "../libs/strings"

export function Time({ dateTime, locale }) {
  return (<time dateTime={dateTime}>
    {formatDate(dateTime, locale)}
  </time>
  )
}

export function ReadingTime({ text, time }) {
  return (
    <time dateTime={durationFromTime(time, 1000)}>{text}</time>
  )
}

export const fragments = graphql`
  fragment ReadingTime on ReadingTime {
    text,
    time
  }
`