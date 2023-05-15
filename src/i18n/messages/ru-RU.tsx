import { LOCALES } from './../locales';

export default {
  [LOCALES.RUSSIAN]: {
    hello: 'Добро пожаловать',
    accountPageSubtitleSignIn: 'С возвращением!',
    accountPageTitleSignIn: 'Войдите в свой аккаунт',
    accountPageSubtitleSignUp: 'Создайте аккаунт!',
    accountPageTitleSignUp: 'Создайте свой аккаунт',

    navigationWelcomeLink: 'ГЛАВНАЯ',
    navigationBtnSighIn: 'Войти',
    navigationBtnSighUp: 'Регистрация',
    navigationBtnSignOut: 'Выйти',

    signInWrongPassword: 'Неверный пароль',
    signInUserNotFound: 'Пользователь не найден. Пожалуйста зарегистрируйтесь',
    signInEnterEmailPlaceholder: 'Введите email',
    signInEnterPasswordPlaceholder: 'Введите пароль',

    signUpEmailExistError:
      'Аккаунт с таким email уже существует. Пожалуйста войдите в систему',
    signUpEnterEmailPlaceholder: 'Введите email',
    signUpEnterPasswordPlaceholder: 'Введите пароль',
    signUpBtnSighIn: 'Войти',
    signUpBtnSighUp: 'Регистрация',

    editorGraphQLApiPlaceholder:
      'Пожалуйста введите graphQL api [может быть удалено после реализации документации]',
    editorAlertError: 'Ошибка',
    editorGraphQLUnhandledError:
      'Произошла ошибка при обработке Graphql запроса',
    editorOptionsJsonError:
      'Ошибка формирования JSON опций запроса, необходимо исправить на корректный JSON объект!',

    optionsEditorVariablesTab: 'Переменные',
    optionsEditorHeadersTab: 'Заголовки',

    welcomePageTitleNotIsAuth:
      'Начните с создания учетной записи или авторизации',
    welcomePageTitleIsAuth: 'Добро пожаловать! Ваша сессия активна',
    welcomePageSubtitle: 'Начните работу с приложением GraphiQL',
    welcomePageBtnSighIn: 'Войти',
    welcomePageBtnSighUp: 'Регистрация',
    welcomePageBtnGoToEditor: 'Перейти к редактору',

    errRequired: '* Это поле обязательно к заполнению',
    errMinLength: '* В этом поле должно быть не менее 8 букв',
    errAtLeastOneLetter: '* Это поле должно содержать хотя бы одну букву',
    errAtLeastOneDigit: '* Это поле должно содержать хотя бы одну цифру',
    errSpecialCharacter:
      '* Это поле должно содержать хотя бы один специальный символ',
  },
};
