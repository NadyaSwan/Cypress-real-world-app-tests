import { SIGN_UP_HREF_LINK } from '../constants';
import {
  mockGraphQL,
  mockLogin,
  mockNotifications,
  mockPublicTransactions
} from '../interceptors/mocks';
import { loginPage, onboardingPage } from '../pages';

describe('Login', () => {
  const fillInCredentialsAndLogIn = () => {
    loginPage.userNameInput().type('existinguser@gmail.com');
    loginPage.passwordInput().type('123456789');
    loginPage.loginButton().click();
  };

  beforeEach(() => {
    cy.visit('/signin');
  });

  context('General Checks', () => {
    it('should display the logo properly', () => {
      loginPage.logo().should('be.visible');
    });

    it('should display the header properly', () => {
      loginPage
        .header()
        .should('be.visible')
        .and('have.text', loginPage.HEADER_TEXT);
    });

    it('should display the Username input properly', () => {
      loginPage.userNameInput().should('be.visible');
    });

    it('should display the Password input properly', () => {
      loginPage.passwordInput().should('be.visible');
    });

    it('should display the Remember me checkbox properly', () => {
      loginPage.rememberMeCheckbox().should('not.be.checked');
    });

    it('should display the Remember me checkbox label properly', () => {
      loginPage
        .rememberMeCheckboxLabel()
        .should('be.visible')
        .and('have.text', loginPage.REMEMBER_ME_CHECKBOX_TEXT);
    });

    it('should display the Sign in button properly', () => {
      loginPage
        .loginButton()
        .should('be.visible')
        .and('have.text', loginPage.LOGIN_BUTTON_TEXT)
        .and('be.enabled');
    });

    it('should display the Sign up link properly', () => {
      loginPage
        .signUpLink()
        .should('be.visible')
        .and('have.text', loginPage.SIGN_UP_ANCHOR_TEXT)
        .and('have.attr', 'href', SIGN_UP_HREF_LINK);
    });

    it('should redirect the unauthenticated user to the login page when visiting other pages', () => {
      cy.visit('/onboarding-page');
      cy.url().should('match', '/signin');
      loginPage.loginButton().should('be.visible');
    });
  });

  context('Validation', () => {
    it('should display the Username input as a label when it is focused', () => {
      loginPage.userNameInputPlaceholder().should('not.exist');
      loginPage
        .userNameInputLabel()
        .should('be.visible')
        .and('have.text', loginPage.USERNAME_TEXT);
    });

    it('should display the Username input as a placeholder when it is unfocused', () => {
      loginPage.userNameInput().blur();
      loginPage.userNameInputLabel().should('not.exist');
      loginPage
        .userNameInputPlaceholder()
        .should('be.visible')
        .and('have.text', loginPage.USERNAME_TEXT);
    });

    it('should display the Password input as a label when it is focused', () => {
      loginPage.passwordInput().click();
      loginPage.passwordInputPlaceholder().should('not.exist');
      loginPage
        .passwordInputLabel()
        .should('be.visible')
        .and('have.text', loginPage.PASSWORD_TEXT);
    });

    it('should display the Password input as a label when it is unfocused', () => {
      loginPage.passwordInput().click();
      loginPage.passwordInput().blur();
      loginPage.passwordInputLabel().should('not.exist');
      loginPage
        .passwordInputPlaceholder()
        .should('be.visible')
        .and('have.text', loginPage.PASSWORD_TEXT);
    });

    it('should check/uncheck the Remember me checkbox', () => {
      loginPage
        .rememberMeCheckbox()
        .should('not.be.checked')
        .click()
        .should('be.checked');
    });

    it('should validate the required Username field on blur and do validation when typing', () => {
      loginPage.userNameErrorMessage().should('not.exist');
      loginPage.userNameInput().blur();
      loginPage
        .userNameErrorMessage()
        .should('be.visible')
        .and('have.text', loginPage.USERNAME_REQUIRED_ERROR_MESSAGE_TEXT);
      loginPage.userNameInput().type('test');
      loginPage.userNameErrorMessage().should('not.exist');
      loginPage.userNameInput().clear();
      loginPage
        .userNameErrorMessage()
        .should('be.visible')
        .and('have.text', loginPage.USERNAME_REQUIRED_ERROR_MESSAGE_TEXT);
    });

    it('should not validate the Password input on blur when the value is empty', () => {
      loginPage.passwordErrorMessage().should('not.exist');
      loginPage.passwordInput().click();
      loginPage.passwordInput().blur();
      loginPage.passwordErrorMessage().should('not.exist');
    });

    it('should validate the min length for the Password input on blur and do validation when typing', () => {
      loginPage.passwordErrorMessage().should('not.exist');
      loginPage.passwordInput().type('123').blur();
      loginPage
        .passwordErrorMessage()
        .should('be.visible')
        .and('have.text', loginPage.PASSWORD_IS_TOO_SHORT_ERROR_MESSAGE_TEXT);
      loginPage.passwordInput().type('4');
      loginPage.passwordErrorMessage().should('not.exist');
      loginPage.passwordInput().clear().type('12');
      loginPage
        .passwordErrorMessage()
        .should('be.visible')
        .and('have.text', loginPage.PASSWORD_IS_TOO_SHORT_ERROR_MESSAGE_TEXT);
      loginPage.passwordInput().clear();
      loginPage.passwordErrorMessage().should('not.exist');
    });

    it('should enable the Sign in button when all of the field are correct', () => {
      loginPage.userNameInput().blur();
      loginPage.loginButton().should('be.disabled');
      loginPage.userNameInput().type('test');
      loginPage.loginButton().should('be.disabled');
      loginPage.passwordInput().type('1234');
      loginPage.loginButton().should('be.enabled');
      loginPage.passwordInput().clear().type('123');
      loginPage.loginButton().should('be.disabled');
      loginPage.passwordInput().clear();
      loginPage.loginButton().should('be.disabled');
    });
  });

  context('Successful', () => {
    it('should allow the user to log in with correct credetials', () => {
      mockLogin({ fxPath: 'loginSuccessful' }).as('login');
      mockPublicTransactions().as('public');
      mockGraphQL().as('graphql');
      mockNotifications().as('notifications');

      fillInCredentialsAndLogIn();

      cy.wait(['@login', '@public', '@graphql', '@notifications']);
      loginPage.header().should('not.exist');
      cy.url().should('not.include', '/signin');
      onboardingPage
        .title()
        .should('be.visible')
        .and('have.text', onboardingPage.TITLE_TEXT);
    });
  });

  context('Failed', () => {
    it('should not allow the user to log in with incorrect credentials', () => {
      mockLogin({ body: 'Unauthorized', statusCode: 401 }).as('login');

      fillInCredentialsAndLogIn();

      cy.wait('@login');
      cy.url().should('include', '/signin');
      loginPage
        .loginErrorMessage()
        .should('be.visible')
        .and('have.text', loginPage.LOGIN_ERROR_MESSAGE_TEXT);
    });
  });
});
