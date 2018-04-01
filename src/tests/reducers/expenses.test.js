import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const expected = [];
    const actual = expensesReducer(undefined, { type: '@@INIT' });
    expect(actual).toEqual(expected);
});

test('should remove expense by id', () => {
    const testInputAction = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const expected = [ expenses[0], expenses[2] ];
    const actual = expensesReducer(expenses, testInputAction);
    expect(actual).toEqual(expected);
});

test('should not remove expenses if id not found', () => {
    const expected = expenses;
    const testInputAction = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const actual = expensesReducer(expenses, testInputAction);
    expect(actual).toEqual(expected);
});

test('should add an expense', () => {
    const testDescription = 'New Test Expense'
    const newExpense =  {   id: '9999',
                            description: testDescription,
                            note: '',
                            amount: 1973,
                            createdAt: 0
                        }; 

    const testInputAction = {
        type: 'ADD_EXPENSE',
        expense: newExpense
    };
    
    const actual = expensesReducer(expenses, testInputAction);
    expect(actual).toEqual([...expenses, newExpense]);
});

test('should edit an expense', () => {
    const newNote = 'This note is for editing test';
    const newAmount = 99999;
    const testInputAction = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            note: newNote,
            amount: newAmount
        }
    };
    const actual = expensesReducer(expenses, testInputAction);
    expect(actual[1].amount).toBe(newAmount);
    expect(actual[1].note).toBe(newNote);
});

test('should NOT edit when id not found', () => {
    const newNote = 'This note is for editing test';
    const newAmount = 99999;
    const testInputAction = {
        type: 'EDIT_EXPENSE',
        id: 9999999,
        updates: {
            note: newNote,
            amount: newAmount
        }
    };
    const actual = expensesReducer(expenses, testInputAction);
    expect(actual).toEqual(expenses);
});

test('should set expenses', () => {
    const testInputState = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };

    const actual = expensesReducer(expenses, testInputState);
    expect(actual).toEqual([expenses[1]]);
});