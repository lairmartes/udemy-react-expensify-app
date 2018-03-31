import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const actual = filtersReducer(undefined, { type: '@@INIT' });
    expect(actual).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const actual = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(actual.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const testInputState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };

    const testInputAction = { type: 'SORT_BY_DATE' };
    const actual =  filtersReducer(testInputState, testInputAction);
    expect(actual.sortBy).toBe('date');
});

test('should set text filter', () => {
    const textToSearch = 'search text';
    const testInputState = {
        text: 'text to be replaced by action param'
    };

    const testInputAction = { 
        type: 'SET_TEXT_FILTER', 
        text: textToSearch 
    };

    const actual = filtersReducer(testInputState, testInputAction);
    expect(actual.text).toBe(textToSearch);
});

test('should set start date filter', () => {
    const dateToSetUp = moment(10000000).valueOf();
    const testInputState = {
        startDate: moment(2000000).valueOf()
    };

    const testInputAction = {
        type: 'SET_START_DATE',
        startDate: dateToSetUp
    };

    const actual = filtersReducer(testInputState, testInputAction);
    expect(actual.startDate).toBe(dateToSetUp);
});

test('should set end date filter', () => {
    const dateToSetUp = moment(10000000).valueOf();
    const testInputState = {
        endDate: moment(2000000).valueOf()
    };

    const testInputAction = {
        type: 'SET_END_DATE',
        endDate: dateToSetUp
    };

    const actual = filtersReducer(testInputState, testInputAction);
    expect(actual.endDate).toBe(dateToSetUp); 
});