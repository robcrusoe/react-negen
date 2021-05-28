import { useReducer } from 'react';

/* Defining a `Reducer Function` ... */
const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return { ...state, value: action.value };
    } else if (action.type === 'BLUR') {
        return { ...state, isTouched: true };
    } else if (action.type === 'RESET') {
        return initialInputState;
    }
};

/* Defining an initial state ... */
const initialInputState = {
    value: '',
    isTouched: false
};



export const useInput = (validateValue) => {
    const [inputState, inputDispatchFunction] = useReducer(inputStateReducer, initialInputState);

    const hasError = !validateValue(inputState.value, inputState.isTouched);

    const valueInputChangeHandler = (event) => {
        inputDispatchFunction({
            type: 'INPUT',
            value: event.target.value
        });
    };

    const valueInputFocusHandler = (event) => {
        inputDispatchFunction({
            type: 'BLUR'
        });
    };

    const reset = () => {
        inputDispatchFunction({
            type: 'RESET'
        });
    };

    return {
        value: inputState.value,
        hasError,
        valueInputChangeHandler,
        valueInputFocusHandler,
        reset
    };
};