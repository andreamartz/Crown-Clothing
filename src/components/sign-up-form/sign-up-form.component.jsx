import { useState } from 'react';

import { 
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth, 
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields; 

  console.log("FORM FIELDS: ", formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // confirm password matches; if it doesn't stop and return
    // TODO: Tell user why sign up did not work
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      // Note that the user will NOT have a value for displayNamedisplayName
      const { user } = await createAuthUserWithEmailAndPassword(
        email, 
        password
      );

      // need to pass in an object with the user-entered displayName; if we don't pass that in, displayName will be null
      const userDocRef = await createUserDocumentFromAuth(user, { displayName });
      
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.error("User creation encountered an error", error);
      }
    }
  }

    // use createAuthUserWithEmailAndPassword to see if 
    // create a user document

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  }

  return (
    <>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="displayName">Display Name</label>
        <input 
          id="displayName"
          type="text" 
          required 
          onChange={handleChange} 
          name="displayName"
          value={displayName}
        />

        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email" 
          required
          onChange={handleChange} 
          name="email"
          value={email}
        />
        
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password" 
          required
          onChange={handleChange} 
          name="password"
          value={password}
        />
        
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
          id="confirmPassword"
          type="password" 
          required
          onChange={handleChange} 
          name="confirmPassword"
          value={confirmPassword}
        />

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignUpForm;