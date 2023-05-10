import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const testCasesPLN = [
  { amount: 40, expected: 'PLN 40.00 = $11.43' },
  { amount: 50, expected: 'PLN 50.00 = $14.29' },
  { amount: 100, expected: 'PLN 100.00 = $28.57' },
  { amount: 150, expected: 'PLN 150.00 = $42.86' },
  { amount: 200, expected: 'PLN 200.00 = $57.14' },
];
const testCasesUSD = [
  { amount: 40, expected: '$40.00 = PLN 140.00' },
  { amount: 50, expected: '$50.00 = PLN 175.00' },
  { amount: 100, expected: '$100.00 = PLN 350.00' },
  { amount: 150, expected: '$150.00 = PLN 525.00' },
  { amount: 200, expected: '$200.00 = PLN 700.00' },
];

const testCases = [
  { amount: 40, from: 'PLN', to: 'PLN', expected: 'PLN 40.00 = PLN 40.00' },
  { amount: 140, from: 'PLN', to: 'PLN', expected: 'PLN 140.00 = PLN 140.00' },
  { amount: 240, from: 'PLN', to: 'PLN', expected: 'PLN 240.00 = PLN 240.00' },
  { amount: 40, from: 'USD', to: 'USD', expected: '$40.00 = $40.00' },
  { amount: 140, from: 'USD', to: 'USD', expected: '$140.00 = $140.00' },
  { amount: 240, from: 'USD', to: 'USD', expected: '$240.00 = $240.00' },
];

const testCasesWrong = [
  { amount: -1, from: 'PLN', to: 'PLN' },
  { amount: -2, from: 'PLN', to: 'USD' },
  { amount: -3, from: 'USD', to: 'USD' },
  { amount: -4, from: 'USD', to: 'PLN' },
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    for (const testObj of testCasesPLN) {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    for (const testObj of testCasesUSD) {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> USD or PLN -> PLN', () => {
    for (const testObj of testCases) {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
      cleanup();
    }
  });
  it('should render "wrong value..." when value is < 0', () => {
    for (const testObj of testCasesWrong) {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const output = screen.getByTestId('wrong-value');
      expect(output).toHaveTextContent('Wrong value...');
      cleanup();
    }
  });
});
