function append(acc, arg) {
  return acc + arg + " "
}

export function classNames(...args) {
  let classes = ""

  for (const arg of args) {
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === "string" || argType === 'number') {
      classes = append(classes, arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) classes = append(classes, inner);
    } else if (argType === "object") {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes = append(classes, key);
      }
    }
  }

  return classes
}

export function formatDate(dateString, locale) {
  const date = new Date(dateString);

  return date.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
}
