function append(acc, arg) {
  return acc + arg + ' ';
}

export function classNames(...args) {
  let classes = '';

  for (const arg of args) {
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      classes = append(classes, arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) classes = append(classes, inner);
    } else if (argType === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes = append(classes, key);
      }
    }
  }

  return classes;
}

export function formatDate(dateString, locale) {
  const date = new Date(dateString);

  return date.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
}

export function formatDateTime(dateString, locale) {
  const date = new Date(dateString);

  return date.toLocaleString(locale, {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    dayPeriod: 'narrow'
  });
}

const SECONDS_IN_UNIT = [
  [604800, 'W'],
  [86400, 'D'],
  [3600, 'H'],
  [60, 'M'],
  [1, 'S'],
];

export function durationFromTime(time = 0, convFact = 1000) {
  const seconds = Math.round(time / convFact);

  if (seconds < 0.5) return 'PT0S';
  const { duration: result } = SECONDS_IN_UNIT.reduce(
    (prev, [unit, letter]) => {
      let { duration, remainder } = prev;

      if (remainder < unit) {
        return prev;
      }

      return {
        duration: duration + Math.floor(remainder / unit) + letter,
        remainder: (remainder %= unit),
      };
    },
    { duration: 'PT', remainder: Math.round(time / convFact) }
  );

  return result;
}
