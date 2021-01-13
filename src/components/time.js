import * as React from "react"

import { formatDate } from "../libs/strings"

export const Time = ({ dateTime, locale }) => (
  <time dateTime={dateTime}>
    {formatDate(dateTime, locale)}
  </time>
)