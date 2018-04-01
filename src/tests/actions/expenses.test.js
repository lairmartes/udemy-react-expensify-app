import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    startEditExpense,
    removeExpense, 
    startRemoveExpense,
    setExpenses, 
    startSetExpenses } from '../../actions/expenses';
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

test('should remove expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id})).then((done) => {
        const actual = store.getActions();
        expect(actions[0].toEqual({
            type: 'REMOVE_EXPENSE',
            id
        }));
  
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });

    done();
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

test('should edit expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[0].id;
    const updates = { amount: 21045 };
    store.dispatch(startEditExpense(id, updates)).then((done) => {
        const actual = store.getActions();
        expect(actual[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
    done();
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

    store.dispatch(startAddExpense(expenseData)).then((done) => {
        const actual = store.getActions();
        expect(actual[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

         return database.ref(`expenses/${actions[0].expense.id}`).once('value')
         }).then((snapshot) => {
             expected(snapshot.val()).toEqual(expenseData);
             done();
    });

    done();
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense(expenseData)).then((done) => {
        const actual = store.getActions();
        expect(actual[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

         return database.ref(`expenses/${actions[0].expense.id}`).once('value')
         }).then((snapshot) => {
             expected(snapshot.val()).toEqual(expenseData);
             done();
    });
    done();
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