import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return total 0 zero if no expenses', () => {
    const expected = 0;
    const actual = selectExpensesTotal([]);
    expect(actual).toBe(expected);
});

test('should return total value of a single expense', () => {
    const expected = expenses[1].amount;
    const actual = selectExpensesTotal([ expenses[1] ]);
    expect(actual).toBe(expected);
});

test('should return total valuel of a list of expenses', () => {
    const expected = expenses
                        .map((expense) => expense.amount)
                        .reduce((result, amount) => result + amount);
    const actual = selectExpensesTotal(expenses);
    expect(actual).toBe(expected);
});