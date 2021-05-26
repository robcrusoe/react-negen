import { useState, useEffect } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  /* Component function is re-rendered everytime the state changes */
  const enteredNameIsValid = enteredName.trim() !== '' && enteredNameTouched;
  const enteredEmailIsValid = enteredEmail.trim() !== '' && enteredEmail.includes('@') && enteredEmailTouched;

  useEffect(() => {
    setFormIsValid(enteredNameIsValid && enteredEmailIsValid);
  }, [enteredNameIsValid, enteredEmailIsValid]);

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const nameInputFocusHandler = event => {
    setEnteredNameTouched(true);
  };

  const emailInputFocusHandler = event => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) { return; }

    console.log('* Entered Name: ', enteredName);
    setEnteredName('');
    setEnteredNameTouched(false);

    setEnteredEmail('');
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = enteredNameIsValid ? 'form-control' : 'form-control invalid';
  const emailInputClasses = enteredEmailIsValid ? 'form-control': 'form-control invalid';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameInputChangeHandler} value={enteredName} onFocus={nameInputFocusHandler} />
        {!enteredNameIsValid && <p className='error-text'>Name must not be empty!</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input type='email' id='email' onChange={emailInputChangeHandler} value={enteredEmail} onFocus={emailInputFocusHandler} />
        {!enteredEmailIsValid && <p className='error-text'>Email must not be empty and must contain '@'</p>}
      </div>

      <div className="form-actions">
        <button type='submit' disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
