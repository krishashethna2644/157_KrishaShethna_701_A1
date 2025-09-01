/**
 * Calculates the Simple Return on Investment (ROI).
 *
 * @param {object} args - The arguments for the ROI calculation.
 * @param {number} args.initialInvestment - The initial amount of the investment.
 * @param {number} args.finalValue - The final value of the investment.
 * @returns {number} The ROI as a decimal.
 */
function roi({ initialInvestment, finalValue }) {
  if (initialInvestment === 0) {
    throw new Error('Initial investment cannot be zero.');
  }
  return (finalValue - initialInvestment) / initialInvestment;
}

/**
 * Calculates the Annualized Return on Investment.
 *
 * @param {object} args - The arguments for the calculation.
 * @param {number} args.initialInvestment - The initial amount of the investment.
 * @param {number} args.finalValue - The final value of the investment.
 * @param {number} args.years - The duration of the investment in years.
 * @returns {number} The annualized ROI as a decimal.
 */
function annualizedRoi({ initialInvestment, finalValue, years }) {
  if (years === 0) {
    throw new Error('Years cannot be zero for annualized ROI calculation.');
  }
  const simpleRoi = roi({ initialInvestment, finalValue });
  return Math.pow(1 + simpleRoi, 1 / years) - 1;
}

const { differenceInDays } = require('date-fns');

/**
 * Calculates the Internal Rate of Return (IRR) for a series of transactions.
 * Transactions should be an array of objects, each with a 'date' and 'amount'.
 * Deposits are negative, withdrawals/final value are positive.
 *
 * @param {Array<object>} transactions - An array of transaction objects.
 * @param {Date|string} transactions[].date - The date of the transaction.
 * @param {number} transactions[].amount - The amount of the transaction.
 * @returns {number} The IRR as a decimal.
 */
function irr(transactions) {
  // Basic validation
  if (!Array.isArray(transactions) || transactions.length < 2) {
    throw new Error('IRR calculation requires at least two transactions.');
  }

  // Sort transactions by date just in case they are not ordered
  const sortedTransactions = transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
  const startDate = new Date(sortedTransactions[0].date);

  const cashFlows = sortedTransactions.map(tx => ({
    amount: tx.amount,
    years: differenceInDays(new Date(tx.date), startDate) / 365.25
  }));

  // NPV function
  const npv = (rate) => cashFlows.reduce((acc, cf) => acc + cf.amount / Math.pow(1 + rate, cf.years), 0);
  
  // Derivative of NPV function
  const npvDerivative = (rate) => cashFlows.reduce((acc, cf) => {
    if (cf.years === 0) return acc;
    return acc - (cf.years * cf.amount) / Math.pow(1 + rate, cf.years + 1);
  }, 0);

  let guess = 0.1; // Initial guess for IRR
  const maxIterations = 100;
  const tolerance = 1e-7;

  for (let i = 0; i < maxIterations; i++) {
    const npvValue = npv(guess);
    const derivativeValue = npvDerivative(guess);

    if (Math.abs(derivativeValue) < tolerance) {
      break; // Avoid division by zero
    }

    const newGuess = guess - npvValue / derivativeValue;
    
    if (Math.abs(newGuess - guess) < tolerance) {
      return newGuess; // Converged
    }
    
    guess = newGuess;
  }

  throw new Error('IRR calculation did not converge. Check your cash flows.');
}


module.exports = {
  roi,
  annualizedRoi,
  irr
}; 