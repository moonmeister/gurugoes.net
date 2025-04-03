import { jsx } from 'react/jsx-runtime';
import readingTime from 'reading-time';
import { f as formatDate, d as durationFromTime } from './base_C7VT7Vsi.mjs';

function Time({ dateTime, locale }) {
  return /* @__PURE__ */ jsx("time", { dateTime, children: formatDate(dateTime, locale) });
}
function ReadingTime({ content }) {
  if (!content) {
    return null;
  }
  const stats = readingTime(content);
  return /* @__PURE__ */ jsx("time", { dateTime: durationFromTime(stats.time, 1e3), children: stats.text });
}

export { ReadingTime as R, Time as T };
