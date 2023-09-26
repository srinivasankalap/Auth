import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import { useContext, useRef } from 'react';
const ProfileForm = () => {
  const newPassword=useRef();
  const authCtx=useContext(AuthContext);

  const submitHandler=(event)=>{
    event.preventDefault();
    const enteredNewPassword=newPassword.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBycSmTAkk_MbjTNxVPNXryNlABlqht8Co',{
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken:true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( res=>{
      if (res.ok){
        return res.json();
      }else{
        return res.json().then(data=>{
          let errorMessage='Authentication Failed!..';
          if (data && data.error && data.error.message){
            errorMessage=data.error.message;
          }
          alert(errorMessage);
          throw new Error(errorMessage);
        });
      }
    }).then(data=>{
      console.log(data)
    }).catch(err=>{
      alert(err.message);
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassword}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
