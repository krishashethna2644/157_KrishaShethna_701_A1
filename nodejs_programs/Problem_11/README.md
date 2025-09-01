# fin-calc

A lightweight, zero-dependency financial calculator for common investment metrics like ROI, Annualized ROI, and Internal Rate of Return (IRR).

## Installation

Install the package using npm:

```bash
npm install fin-calc
```

## Usage

Import the functions you need from the package.

```javascript
const { roi, annualizedRoi, irr } = require('fin-calc');
```

### `roi({ initialInvestment, finalValue })`

Calculates the Simple Return on Investment.

**Arguments:**
- `initialInvestment` (number): The initial amount of the investment.
- `finalValue` (number): The final value of the investment.

**Returns:** (number) The ROI as a decimal.

**Example:**
```javascript
const simpleROI = roi({ initialInvestment: 1000, finalValue: 1500 });
// => 0.5 (which is 50%)
```

### `annualizedRoi({ initialInvestment, finalValue, years })`

Calculates the Annualized Return on Investment.

**Arguments:**
- `initialInvestment` (number): The initial amount of the investment.
- `finalValue` (number): The final value of the investment.
- `years` (number): The duration of the investment in years.

**Returns:** (number) The annualized ROI as a decimal.

**Example:**
```javascript
const annualized = annualizedRoi({ initialInvestment: 1000, finalValue: 1500, years: 2 });
// => 0.2247... (which is approx 22.47%)
```

### `irr(transactions)`

Calculates the Internal Rate of Return for a series of transactions. This is the most accurate way to measure performance when multiple cash flows (deposits/withdrawals) are involved.

**Cash Flow Convention:**
For the IRR calculation to be accurate, you must follow this convention:
- **Money In** (initial investment, deposits) must be **negative** numbers.
- **Money Out** (final value, withdrawals) must be **positive** numbers.

**Arguments:**
- `transactions` (Array<Object>): An array of transaction objects.
  - `date` (Date | string): The date of the transaction.
  - `amount` (number): The amount of the transaction.

**Returns:** (number) The IRR as a decimal.

**Example:**
```javascript
const transactions = [
  { date: '2022-01-01', amount: -1000 }, // Initial investment
  { date: '2022-06-01', amount: -500 },  // Another deposit
  { date: '2023-01-01', amount: 1650 }   // Final value of the portfolio
];

const annualIRR = irr(transactions);
// => 0.118... (which is approx 11.8%)
```
## License

ISC 