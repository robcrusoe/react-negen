import { useRef } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    console.log(nameInputRef.current.value);
    nameInputRef.current.value = '';
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
