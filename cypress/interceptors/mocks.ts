export const mockLogin = (options: {
  fxPath?: string;
  body?: string;
  statusCode?: number;
}) => {
  const { body, fxPath, statusCode } = options;

  const response = fxPath ? { fixture: fxPath } : { body, statusCode };

  return cy.intercept('POST', '**/login', response);
};

export const mockPublicTransactions = () => {
  return cy.intercept('GET', '**/transactions/public', {
    fixture: 'publicTransactions'
  });
};

export const mockGraphQL = () => {
  return cy.intercept('POST', '**/graphql', { data: { listBankAccount: [] } });
};

export const mockNotifications = () => {
  return cy.intercept('GET', '**/notifications', { results: [] });
};
