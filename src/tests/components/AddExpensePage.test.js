import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import toJSON from 'enzyme-to-json';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;

beforeEach( () => {
    addExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

test('should render AddExpensePage correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenCalledWith('/'); //call function with parameter
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});