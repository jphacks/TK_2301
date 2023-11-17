export const AuthError = {
  // SignUpエラー
  EmailAlreadyInUse: 'auth/email-already-in-use',
  OperationNotAllowed: 'auth/operation-not-allowed',
  WeakPassword: 'auth/weak-password',

  // SignInエラー
  UserDisabled: 'auth/user-disabled',
  UserNotFound: 'auth/user-not-found',
  WrongPassword: 'auth/wrong-password',

  // SignUp, SignIn 両方で起きるエラー
  InvalidEmail: 'auth/invalid-email',
};
