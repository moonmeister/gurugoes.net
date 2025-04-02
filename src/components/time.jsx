import readingTime from "reading-time";

import { formatDate, durationFromTime } from "../lib/strings";

export function Time({ dateTime, locale }) {
	return <time dateTime={dateTime}>{formatDate(dateTime, locale)}</time>;
}

export function ReadingTime({ content }) {
	if (!content) {
		return null;
	}
	const stats = readingTime(content);
	return (
		<time dateTime={durationFromTime(stats.time, 1000)}>{stats.text}</time>
	);
}
