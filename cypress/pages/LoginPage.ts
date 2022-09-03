import { InputType } from '../constants';

export class LoginPage {
  readonly HEADER_TEXT = 'Sign in';
  readonly USERNAME_TEXT = 'Username';
  readonly PASSWORD_TEXT = 'Password';
  readonly REMEMBER_ME_CHECKBOX_TEXT = 'Remember me';
  readonly LOGIN_BUTTON_TEXT = 'Sign In';
  readonly SIGN_UP_ANCHOR_TEXT = "Don't have an account? Sign Up";
  readonly USERNAME_REQUIRED_ERROR_MESSAGE_TEXT = 'Username is required';
  readonly PASSWORD_IS_TOO_SHORT_ERROR_MESSAGE_TEXT =
    'Password must contain at least 4 characters';
  readonly LOGIN_ERROR_MESSAGE_TEXT = 'Username or password is invalid';

  private readonly USERNAME_LABEL_SELECTOR = '#username-label';
  private readonly PASSWORD_LABEL_SELECTOR = '#password-label';
  private readonly FOCUSED_SELECTOR = '.Mui-focused';

  logo() {
    return cy.get('.makeStyles-logo-3');
  }

  header() {
    return cy.get('.MuiTypography-h5');
  }

  userNameInput() {
    return cy.get('#username');
  }

  userNameInputLabel() {
    return cy.get(`${this.USERNAME_LABEL_SELECTOR}${this.FOCUSED_SELECTOR}`);
  }

  userNameInputPlaceholder() {
    return cy.get(
      `${this.USERNAME_LABEL_SELECTOR}:not(${this.FOCUSED_SELECTOR})`
    );
  }

  userNameErrorMessage() {
    return cy.get('#username-helper-text');
  }

  passwordInput() {
    return cy.get('#password');
  }

  passwordInputLabel() {
    return cy.get(`${this.PASSWORD_LABEL_SELECTOR}${this.FOCUSED_SELECTOR}`);
  }

  passwordInputPlaceholder() {
    return cy.get(
      `${this.PASSWORD_LABEL_SELECTOR}:not(${this.FOCUSED_SELECTOR})`
    );
  }

  passwordErrorMessage() {
    return cy.get('#password-helper-text');
  }

  rememberMeCheckbox() {
    return cy.get('input[name="remember"]');
  }

  rememberMeCheckboxLabel() {
    return cy.get('.MuiFormControlLabel-label');
  }

  loginButton() {
    return cy.get('button[data-test="signin-submit"]');
  }

  signUpLink() {
    return cy.get('a[data-test="signup"]');
  }

  loginErrorMessage() {
    return cy.get('div[data-test="signin-error"] .MuiAlert-message');
  }
}
