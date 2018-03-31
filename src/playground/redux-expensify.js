import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
 });

const expenseOne = store.dispatch(addExpense( {description: 'Rent', amount: 100, createdAt:-21000 } ));
const expenseTwo = store.dispatch(addExpense( {description: 'Coffee', amount: 300, createdAt: -1000} ));

// store.dispatch(removeExpense( {  id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

//store.dispatch(setTextFilter('ffe'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

//store.dispatch(setStartDate(0));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(999));



const demoState = {
    expenses: [{
        id: 'rishgntgecharacnters',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent', 
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// const user = {
//     name: 'Sara',
//     age: 38
// };

// console.log({
//     ...user, // object spread operator
//     location: 'São Paulo',
//     age: 18
// });