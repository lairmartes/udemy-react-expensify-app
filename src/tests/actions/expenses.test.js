import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
// const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

// beforeEach(() => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
// });

// afterEach(() => {
//   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
// });

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
    const actual = addExpense(expenses[2]);

    expect(actual).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actual = store.getActions();
        expect(actual[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        done();

        // return database.ref(`expenses/${actions[0].expense.id}`).once('value')
        // }).then((snapshot) => {
        //     expected(snapshot.val()).toEqual(expenseData);
        //     done();
    });
});

test('should add expense with defaults to database and store', () => {
    const store = createMockStore({});
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actual = store.getActions();
        expect(actual[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        done();

        // return database.ref(`expenses/${actions[0].expense.id}`).once('value')
        // }).then((snapshot) => {
        //     expected(snapshot.val()).toEqual(expenseData);
        //     done();
    });

});

// test('should setup add expense action object with default values', () => {
//     const actual = addExpense({});
//     expect(actual).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });