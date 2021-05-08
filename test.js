import { durationFromTime } from './src/libs/time.js';

const tests = [
  {
    input: 0,
    output: 'PT0S',
  },
  {
    input: 1000,
    output: 'PT1S',
  },
  {
    input: 2005,
    output: 'PT2S',
  },
  {
    input: 61000,
    output: 'PT1M1S',
  },
  {
    input: 3.6e6 + 60000 + 1000,
    output: 'PT1H1M1S',
  },
  {
    input: 3.6e6 * 24 + 60000 * 2 + 1000,
    output: 'PT1D2M1S',
  },
  {
    input: 6.048e8 + 3.6e6 * 2 + 60000 + 1000,
    output: 'PT1W2H1M1S',
  },
  {
    input: 6.048e8 + 3.6e6 * 2 + 60000,
    output: 'PT1W2H1M',
  },
];

for (const test of tests) {
  debugger;
  const result = durationFromTime(test.input, 1000);

  if (result === test.output) {
    console.log('SUCCESS: ', result);
  } else {
    console.log('FAILURE: ', result);
  }
}
