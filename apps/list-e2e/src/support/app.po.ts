export const getList = () => cy.get('app-list-item');
export const getSearchField = () => cy.get('app-search input');
export const getSearchButton = () => cy.get('app-search button');
export const search = (text: string) => {
  getSearchField().type(text);

  getSearchButton().click();

  return getList();
}
