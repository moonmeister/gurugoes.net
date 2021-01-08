export function classNames(...args) {
  const classes = args.reduce((acc, arg) => {
    if (!arg) return acc;

    const argType = typeof arg;
    if (argType === "string" || argType === 'number') {
      acc.push(arg);
    } else if (argType === "number") {
      acc.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) acc.push(inner);
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (const [key, value] of Object.entries(arg)) {
          if (value) acc.push(key);
        }
      }
    }

    return acc
  }, [])

  return classes.join(' ');
}
