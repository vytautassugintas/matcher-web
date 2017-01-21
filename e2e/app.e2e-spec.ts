import { MatcherWebPage } from './app.po';

describe('matcher-web App', function() {
  let page: MatcherWebPage;

  beforeEach(() => {
    page = new MatcherWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
