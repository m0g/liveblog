'use strict';

function openBlog(index) {
    index = index || 0;
    element(by.repeater('blog in blogs._items').row(index).column('blog.title')).click();
}

function randomString(maxLen) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < maxLen; i ++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function expectBlogsLength(len) {
    expect(element.all(by.repeater('blog in blogs._items')).count()).toEqual(len);
}

function logout() {
    element(by.css('button.current-user')).click();
    browser.waitForAngular();
    browser.sleep(500); // it reloads page
    element(by.buttonText('SIGN OUT')).click();
    browser.sleep(500); // it reloads page
}

function expectBlog(blog, index) {
    index = index || 0;
    var allBlogs = element.all(by.repeater('blog in blogs._items')),
        currentBlog = allBlogs.get(index);

    expect(currentBlog.element(by.binding('blog.title')).getText()).toBe(blog.title);
    expect(currentBlog.element(by.binding('blog.description')).getText()).toBe(blog.description);
    if (blog.picture_url) {
        expect(currentBlog.getAttribute('if-background-image')).not.toBe('');
    }
    expect(currentBlog.element(by.binding('blog.original_creator | username')).getText())
    .toBe(blog.username);
}

var blogs = [
    {title: 'title: end to end image', description: 'description: end to end image', username: 'first name last name'},
    {title: 'title: end To end three', description: 'description: end to end three', username: 'first name last name'},
    {title: 'title: end to end two', description: 'description: end to end two', username: 'first name last name'},
    {title: 'title: end to end One', description: 'description: end to end one', username: 'first name last name'}
];

exports.openBlog = openBlog;
exports.expectBlog = expectBlog;
exports.expectBlogsLength = expectBlogsLength;
exports.randomString = randomString;
exports.blogs = blogs;
exports.logout = logout;
