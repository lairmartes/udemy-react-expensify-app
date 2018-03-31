import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const actual = removeExpense({ id: '123abc' });
    const expected = {
        type: "REMOVE_EXPENSE",
        id: '123abc'
    };
    expect(actual).toEqual(expected);
});

test('should setup edit expense action object', () => {
    const updatesForTest = {
        description: 'test description',
        amount: '123.45'
    };

    const actual = editExpense( '123abc', updatesForTest );
    const expected = {
        type: "EDIT_EXPENSE",
        id: '123abc',
        updates: updatesForTest
    };

    expect(actual).toEqual(expected);
});

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    };

    const actual = addExpense(expenseData);

    expect(actual).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});

test('should setup add expense action object with default values', () => {
    const actual = addExpense({});
    expect(actual).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});