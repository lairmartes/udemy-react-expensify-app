import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ExpenseListItem } from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render ExpenseListItem with expense data', () => {
    const testId =          expenses[1].id;
    const testDescription = expenses[1].description;
    const testAmount =      expenses[1].amount;
    const testCreatedAt =   expenses[1].createdAt;

    //alternative:
    //const wrapper = shallow(<ExpenseListItem expense = {...expenses[0]} />);

    const wrapper = shallow(<ExpenseListItem expense = {
                                    testId,
                                    testDescription,
                                    testAmount,
                                    testCreatedAt
                                }           
                            />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});