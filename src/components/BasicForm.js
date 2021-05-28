import { React, useEffect, useState } from 'react';
import { useInput } from '../hooks/useInput';

const BasicForm = (props) => {
  /* Making use of `Custom Input Hook` ... */
  const {
    value: firstName,
    hasError: isFirstNameInvalid,
    valueInputChangeHandler: firstNameChangeHandler,
    valueInputFocusHandler: firstNameFocusHandler,
    reset: firstNameResetHandler
  } = useInput((fName, fNameIsTouched) => {
    return fName.trim() !== '' && fNameIsTouched;
  });

  const {
    value: lastName,
    hasError: isLastNameInvalid,
    valueInputChangeHandler: lastNameChangeHandler,
    valueInputFocusHandler: lastNameFocusHandler,
    reset: lastNameResetHandler
  } = useInput((lName, lNameIsTouched) => {
    return lName.trim() !== '' && lNameIsTouched;
  });

  const {
    value: email,
    hasError: isEmailInvalid,
    valueInputChangeHandler: emailChangeHandler,
    valueInputFocusHandler: emailFocusHandler,
    reset: emailResetHandler
  } = useInput((email, emailIsTouched) => {
    return email.trim() !== '' && emailIsTouched && email.includes('@');
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(!isFirstNameInvalid && !isLastNameInvalid && !isEmailInvalid);
  }, [isFirstNameInvalid, isLastNameInvalid, isEmailInvalid]);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log({
      firstName,
      lastName,
      email
    });

    resetForm();
  };

  const resetForm = () => {
    firstNameResetHandler();
    lastNameResetHandler();
    emailResetHandler();
  };

  const firstNameInputClasses = isFirstNameInvalid ? 'form-control invalid' : 'form-control';
  const lastNameInputClasses = isLastNameInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClasses = isEmailInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' value={firstName} onChange={firstNameChangeHandler} onFocus={firstNameFocusHandler} />
          {isFirstNameInvalid && <p className='error-text'>First Name must not be empty!</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' value={lastName} onChange={lastNameChangeHandler} onFocus={lastNameFocusHandler} />
          {isLastNameInvalid && <p className='error-text'>Last Name must not be empty!</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input type='email' id='email' value={email} onChange={emailChangeHandler} onFocus={emailFocusHandler} />
        {isEmailInvalid && <p className='error-text'>Email must not be empty and must include a '@'!</p>}
      </div>
      <div className='form-actions'>
        <button type='submit' disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
