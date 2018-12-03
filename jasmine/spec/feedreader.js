/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

const body = document.querySelector('body');

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('has got a valid URL', function () {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toEqual('');
      }
    });


    /* loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('has got a valid name property', function () {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name).not.toEqual('');
      }
    });
  });

  describe('The menu', function () {
    const menuIcon = $('.menu-icon-link');

    /* the menu element is
     * hidden by default.
     */

    it('is hidden by default', function () {
      expect(body.classList.contains('menu-hidden')).toBeTruthy();
    });

    /* the menu changes
     * visibility when the menu icon is clicked.
     */
    it('should toggle visibility when the menu icon is clicked', function () {

      menuIcon.click();
      expect(body.classList.contains('menu-hidden')).toBeFalsy();

      menuIcon.click();
      expect(body.classList.contains('menu-hidden')).toBeTruthy();
    });
  });

  describe('Initial Entries', function () {

    beforeEach(function (done) {
      loadFeed(0, done);
    });

    /* when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    it('should exist at least 1 entry', function () {
      expect($('.feed .entry').length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('New Feed Selection', function () {
    let firstFeed;
    let nextFeed;

    beforeEach((done)=> {
      loadFeed(0, function() {
        firstFeed = $('.feed').html();
        loadFeed(1, function() {
          nextFeed = $('.feed').html();
          done();
        });
      });
    });

    /* when a new feed is loaded
     * by the loadFeed function, the content actually changes.
     */
    it('should change content when a new feed is loaded', function () {
      expect(firstFeed).not.toEqual(nextFeed);
    });
  });
}());
