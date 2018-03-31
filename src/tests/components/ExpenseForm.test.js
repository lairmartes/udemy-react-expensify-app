import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

const INPUT_SEQUENCE_DESCRIPTION = 0;
const INPUT_SEQUENCE_AMOUNT = 1;

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense = {expenses[1]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on description change', () => {

    const value = 'Description Test';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(INPUT_SEQUENCE_DESCRIPTION).simulate('change', {
        target: { value } // must be the same name of the property
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
     const value = 'Note Test';
     const wrapper = shallow(<ExpenseForm />);
     wrapper.find('textarea').simulate('change', {
         target: { value }
     });
     expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {

    const value = '1973.44';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(INPUT_SEQUENCE_AMOUNT).simulate('change', {
        target: { value } // must be the same name of the property
    });
    expect(wrapper.state('amount')).toBe(value);   
});

test('should NOT set amount if INVALID input', () => {

    const value = '44.1973';
    const expectedValue = '';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(INPUT_SEQUENCE_AMOUNT).simulate('change', {
        target: { value } // must be the same name of the property
    });
    expect(wrapper.state('amount')).toBe(expectedValue);   
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount:      expenses[0].amount,
        note:        expenses[0].note,
        createdAt:   expenses[0].createdAt
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
});