import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {} ;
    expenses.forEach(
        ( {id, description, note, amount, createdAt }) => {
            expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref('expenses').set(expensesData)
                    .then(() => done())
                    .catch((e) => { /* must be implemented due deprecation */ } );
})

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

test('should setup expense action object with data', () => {
    const actual = setExpenses(expenses);
    expect(actual).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});