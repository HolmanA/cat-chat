import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be initialized', () => {
    page.navigateTo();
    expect(page.getAppRoot().isPresent()).toBe(true);
  });
});
