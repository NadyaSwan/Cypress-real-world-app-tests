export class OnboardingPage {
  readonly TITLE_TEXT = 'Get Started with Real World App';

  title() {
    return cy.get('div[data-test="user-onboarding-dialog-title"] h2');
  }
}
