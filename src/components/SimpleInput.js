import { useState, useEffect } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  /* Component function is re-rendered everytime the state changes */
  const enteredNameIsValid = enteredName.trim() !== '' && enteredNameTouched;

  useEffect(() => {
    if (enteredNameIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) { return; }

    console.log('* Entered Name: ', enteredName);
    setEnteredName('');
    setEnteredNameTouched(false);
  };

  const nameInputClasses = enteredNameIsValid ? 'form-control' : 'form-control invalid';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameInputChangeHandler} value={enteredName} onBlur={nameInputBlurHandler} />
        {!enteredNameIsValid && <p className='error-text'>Name must not be empty!</p>}
      </div>
      <div className="form-actions">
        <button type='submit' disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
