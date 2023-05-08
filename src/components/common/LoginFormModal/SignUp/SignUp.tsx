import styles from './SignUp.module.css';
import { Input } from '../../Input';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseClient/clientApp';
import { useAppDispatch } from '../../../../store/hooks';
import { setUserEmail } from '../../../../store/slices/AuthenticationSlice';
import { useForm } from 'react-hook-form';
import { Button } from '../../Button';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

interface SignUpProps {
  closeFormModal?: () => void;
}

interface FormData {
  email: string;
  password: string;
}

export const SignUp = ({ closeFormModal }: SignUpProps) => {
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
  const intl = useIntl();

  const emailExistError = intl.formatMessage({
    id: 'signUpEmailExistError',
  });
  const enterEmailPlaceholder = intl.formatMessage({
    id: 'signUpEnterEmailPlaceholder',
  });
  const enterPasswordPlaceholder = intl.formatMessage({
    id: 'signUpEnterPasswordPlaceholder',
  });
  const buttonSignUp = intl.formatMessage({
    id: 'signUpBtnSighUp',
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const userEmailHandler = (userEmail: string | null) =>
    dispatch(setUserEmail({ userEmail }));

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userEmailHandler(userCredential.user.email);
        reset();
        navigate('/');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage(emailExistError);
        } else {
          console.log(error.message);
        }
      });
  };

  return (
    <div className={styles.contentWrapper}>
      <Input
        type="email"
        placeholder={enterEmailPlaceholder}
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
        placeholder={enterPasswordPlaceholder}
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
          validate: {
            atLeastOneLetter: (value) =>
              /[a-zA-Z]/.test(value) ||
              '* This field must contain at least one letter',

            atLeastOneDigit: (value) =>
              /\d/.test(value) ||
              '* This field must contain at least one digit',
            specialCharacter: (value) =>
              /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
              '* This field must contain at least one special character',
          },
        })}
        error={errors?.password?.message}
      />
      <Button clickHandler={handleSubmit(handleSignUp)} text={buttonSignUp} />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
