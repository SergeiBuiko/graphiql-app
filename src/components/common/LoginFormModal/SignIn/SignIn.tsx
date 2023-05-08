import styles from './SignIn.module.css';
import { Input } from '../../Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseClient/clientApp';
import { useAppDispatch } from '../../../../store/hooks';
import { setUserEmail } from '../../../../store/slices/AuthenticationSlice';
import { useNavigate } from 'react-router-dom';

interface SignInProps {
  closeFormModal?: () => void;
}

interface FormData {
  email: string;
  password: string;
}

export const SignIn = ({ closeFormModal }: SignInProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const userEmailHandler = (userEmail: string | null) =>
    dispatch(setUserEmail({ userEmail }));

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userEmailHandler(userCredential.user.email);
        reset();
        navigate('/');
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          setErrorMessage('Wrong password');
        } else if (error.code === 'auth/user-not-found') {
          setErrorMessage('User not found. Please, sign up');
        } else {
          console.log(error.message);
        }
      });
  };

  return (
    <div className={styles.contentWrapper}>
      <Input
        type="email"
        placeholder="Enter email"
        onInput={handleChangeEmail}
        {...register('email', {
          required: {
            value: true,
            message: '* This field is required',
          },
        })}
        error={errors?.email?.message}
      />
      <Input
        type="text"
        placeholder="Enter password"
        onInput={handleChangePassword}
        {...register('password', {
          required: {
            value: true,
            message: '* This field is required',
          },
          minLength: {
            value: 8,
            message: '* This field must have at least 8 letters',
          },
        })}
        error={errors?.password?.message}
      />
      <Button clickHandler={handleSubmit(handleSignIn)} text="Sign In" />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
