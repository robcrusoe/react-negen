import { useState, useEffect } from 'react';
import { useInput } from './../hooks/useInput';

const SimpleInput = (props) => {
  /* Making use of `Custom Input Hook` */
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputFocusHandler: nameInputFocusHandler,
    reset: nameInputResetHandler
  } = useInput((enteredName, enteredNameIsTouched) => {
    return enteredName.trim() !== '' && enteredNameIsTouched;
  });

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputFocusHandler: emailInputFocusHandler,
    reset: emailInputResetHandler
  } = useInput((enteredEmail, enteredEmailIsTouched) => {
    return enteredEmail.trim() !== '' && enteredEmailIsTouched && enteredEmail.includes('@');
  });

  /* `State Management` for form validity */
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(!nameInputHasError && !emailInputHasError);
  }, [nameInputHasError, emailInputHasError]);

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (nameInputHasError || emailInputHasError) { return; }

    console.log({
      enteredName,
      enteredEmail
    });

    /* Reset values ... */
    nameInputResetHandler();
    emailInputResetHandler();
  };

  const nameInputClasses = !nameInputHasError ? 'form-control' : 'form-control invalid';
  const emailInputClasses = !emailInputHasError ? 'form-control' : 'form-control invalid';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameInputChangeHandler} value={enteredName} onFocus={nameInputFocusHandler} />
        {nameInputHasError && <p className='error-text'>Name must not be empty!</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input type='email' id='email' onChange={emailInputChangeHandler} value={enteredEmail} onFocus={emailInputFocusHandler} />
        {emailInputHasError && <p className='error-text'>Email must not be empty and must contain '@'</p>}
      </div>

      <div className="form-actions">
        <button type='submit' disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
