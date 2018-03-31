import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1} = {}) => (
    {  
        type: 'INCREMENT',
        incrementBy
    }
);

const decrementCount = ( { decrementBy = 1} = {}) => (
    {
        type: 'DECREMENT',
        decrementBy
    }
);

const setCount = ( { count = 0 } = {}) => (
    {
        type: 'SET',
        count
    }
);

const resetCount = () => (
    {
        type: 'RESET'
    }
);

// Reducers
// 1. Reducers are pure functions
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
        return {
            count: state.count + action.incrementBy
        };
        case 'DECREMENT' :
        return {
            count: state.count - action.decrementBy
        };
        case 'SET':
        return {
            count: action.count
        };
        case 'RESET' :
        return {
            count: 0
        };

        default:
            return state;
    }
};

const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
        return {
            count: state.count + action.incrementBy
        };
        case 'DECREMENT' :
        return {
            count: state.count - action.decrementBy
        };
        case 'SET':
        return {
            count: action.count
        };
        case 'RESET' :
        return {
            count: 0
        };

        default:
            return state;
    }
});

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

//Actions - than an object that gets sent to the store

// I'd like to increment the count
// All Caps is Redux standard 
// store.dispatch(
// {
//     type: 'INCREMENT',
//     incrementBy: 5
// });

store.dispatch(incrementCount( { incrementBy: 5 }));

//unsubscribe();

store.dispatch(incrementCount());

// store.dispatch({
//     type: 'RESET'
// });

store.dispatch(resetCount());

store.dispatch(decrementCount());

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// });

store.dispatch(decrementCount( { decrementBy: 10 }));

// store.dispatch({
//     type: 'SET',
//     count: 101
// });

store.dispatch(setCount( {count: 101 }));
