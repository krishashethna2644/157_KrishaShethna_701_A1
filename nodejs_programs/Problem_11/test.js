const finCalc = require('./index');

function runTest(name, testFunction) {
  try {
    testFunction();
    console.log(`✅ Test passed: ${name}`);
  } catch (error) {
    console.error(`❌ Test failed: ${name}`);
    console.error(error);
    process.exit(1);
  }
}

// Test 1: Basic ROI calculation
runTest('Calculates a positive ROI', () => {
  const result = finCalc.roi({ initialInvestment: 1000, finalValue: 1500 });
  const expected = 0.5;
  if (result !== expected) {
    throw new Error(`Expected ${expected}, but got ${result}`);
  }
});

// Test 2: ROI calculation with a loss
runTest('Calculates a negative ROI', () => {
  const result = finCalc.roi({ initialInvestment: 1000, finalValue: 750 });
  const expected = -0.25;
  if (result !== expected) {
    throw new Error(`Expected ${expected}, but got ${result}`);
  }
});

// Test 3: Handles zero initial investment
runTest('Throws an error for zero initial investment', () => {
  try {
    finCalc.roi({ initialInvestment: 0, finalValue: 100 });
    // If this line is reached, the test fails because no error was thrown
    throw new Error('Expected an error to be thrown, but it was not.');
  } catch (error) {
    if (error.message !== 'Initial investment cannot be zero.') {
      throw new Error(`Expected error message "Initial investment cannot be zero.", but got "${error.message}"`);
    }
  }
});

// --- New tests for Annualized ROI ---

// Test 4: Basic annualized ROI
runTest('Calculates annualized ROI over multiple years', () => {
  const result = finCalc.annualizedRoi({ initialInvestment: 1000, finalValue: 1500, years: 2 });
  // Expected: ((1 + 0.5)^(1/2)) - 1 = 0.2247...
  const expected = 0.22474487139158904;
  if (Math.abs(result - expected) > 1e-9) { // Using tolerance for float comparison
    throw new Error(`Expected ${expected}, but got ${result}`);
  }
});

// Test 5: Annualized ROI with fractional years
runTest('Calculates annualized ROI with fractional years', () => {
  const result = finCalc.annualizedRoi({ initialInvestment: 1000, finalValue: 1200, years: 1.5 });
  // Expected: ((1 + 0.2)^(1/1.5)) - 1 = 0.1292...
  const expected = 0.12924323465723409; // Corrected value
  if (Math.abs(result - expected) > 1e-9) {
    throw new Error(`Expected ${expected}, but got ${result}`);
  }
});

// Test 6: Handles zero years for annualized ROI
runTest('Throws an error for zero years in annualized ROI', () => {
  try {
    finCalc.annualizedRoi({ initialInvestment: 1000, finalValue: 1200, years: 0 });
    throw new Error('Expected an error for zero years, but none was thrown.');
  } catch (error) {
    if (error.message !== 'Years cannot be zero for annualized ROI calculation.') {
      throw new Error(`Expected error message "Years cannot be zero...", but got "${error.message}"`);
    }
  }
});

// --- New tests for IRR ---

// Test 7: Basic IRR calculation
runTest('Calculates IRR for a simple investment', () => {
  const transactions = [
    { date: '2022-01-01', amount: -1000 }, // Initial investment
    { date: '2023-01-01', amount: 1200 }   // Final value
  ];
  const result = finCalc.irr(transactions);
  const expected = 0.2001498626914164; // Corrected for leap year precision
  if (Math.abs(result - expected) > 1e-4) { // Using a slightly larger tolerance for IRR
    throw new Error(`Expected ${expected}, but got ${result}`);
  }
});

// Test 8: IRR with multiple cash flows
runTest('Calculates IRR with multiple deposits', () => {
  const transactions = [
    { date: '2022-01-01', amount: -1000 },
    { date: '2022-06-01', amount: -500 },
    { date: '2023-01-01', amount: 1600 }
  ];
  const result = finCalc.irr(transactions);
  const expected = 0.07765819875123363; // Approx 8.09%
  if (Math.abs(result - expected) > 1e-4) {
    throw new Error(`Expected ${expected}, but got ${result}`);
  }
});

// Test 9: IRR with negative result
runTest('Calculates a negative IRR for a loss', () => {
  const transactions = [
    { date: '2022-01-01', amount: -1000 },
    { date: '2023-01-01', amount: 900 }
  ];
  const result = finCalc.irr(transactions);
  const expected = -0.10; // -10% return
  if (Math.abs(result - expected) > 1e-4) {
    throw new Error(`Expected ${expected}, but got ${result}`);
  }
});

// Test 10: Throws an error for insufficient transactions
runTest('Throws an error for insufficient transactions in IRR', () => {
  try {
    finCalc.irr([{ date: '2022-01-01', amount: -1000 }]);
    throw new Error('Expected an error for insufficient transactions, but none was thrown.');
  } catch (error) {
    if (error.message !== 'IRR calculation requires at least two transactions.') {
      throw new Error(`Expected error message "IRR calculation requires...", but got "${error.message}"`);
    }
  }
});


console.log('All tests passed!'); 