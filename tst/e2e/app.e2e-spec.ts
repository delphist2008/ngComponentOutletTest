import { TstPage } from './app.po';

describe('tst App', () => {
  let page: TstPage;

  beforeEach(() => {
    page = new TstPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
