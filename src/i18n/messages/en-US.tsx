import { LOCALES } from './../locales';

export default {
  [LOCALES.ENGLISH]: {
    hello: 'Welcome',
    accountPageSubtitleSignIn: 'Welcome back!',
    accountPageTitleSignIn: 'Sign in to your account',
    accountPageSubtitleSignUp: 'Create account!',
    accountPageTitleSignUp: 'Sign up to your account',

    navigationWelcomeLink: 'WELCOME PAGE',
    navigationBtnSighIn: 'Sigh In',
    navigationBtnSighUp: 'Sign Up',
    navigationBtnSignOut: 'Sign out',

    signInWrongPassword: 'Wrong password',
    signInUserNotFound: 'User not found. Please, sign up',
    signInEnterEmailPlaceholder: 'Enter email',
    signInEnterPasswordPlaceholder: 'Enter password',

    signUpEmailExistError: 'Email already exists. Please, sign in',
    signUpEnterEmailPlaceholder: 'Enter email',
    signUpEnterPasswordPlaceholder: 'Enter password',
    signUpBtnSighIn: 'Sigh In',
    signUpBtnSighUp: 'Sign Up',

    editorGraphQLApiPlaceholder:
      'Please enter some graphQL api [just for dev, can be deleted in the future]',
    editorAlertError: 'Error',
    editorGraphQLUnhandledError: 'Unhandled Graphql error',
    editorOptionsJsonError:
      'Json Error in the Options editor, please check the wrong JSON object!',

    optionsEditorVariablesTab: 'Variables',
    optionsEditorHeadersTab: 'Headers',

    welcomePageTitleNotIsAuth:
      'Get started by creating an account or logging in',
    welcomePageTitleIsAuth: 'Welcome back! Your session is active',
    welcomePageSubtitle: "Let's get started with the GraphiQL App",
    welcomePageBtnSighIn: 'Sigh In',
    welcomePageBtnSighUp: 'Sign Up',
    welcomePageBtnGoToEditor: 'Go To Editor',

    errRequired: '* This field is required',
    errMinLength: '* This field must have at least 8 letters',
    errAtLeastOneLetter: '* This field must contain at least one letter',
    errAtLeastOneDigit: '* This field must contain at least one digit',
    errSpecialCharacter:
      '* This field must contain at least one special character',
  },
};
