import { useState } from 'react';

export const useInput = (validateValue) => {
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const hasError = !validateValue(value, isTouched);

    const valueInputChangeHandler = (event) => {
        setValue(event.target.value);
    };

    const valueInputFocusHandler = (event) => {
        setIsTouched(true);
    };

    const reset = () => {
        setValue('');
        setIsTouched(false);
    };

    return {
        value,
        hasError,
        valueInputChangeHandler,
        valueInputFocusHandler,
        reset
    };
};