var liveblogSyndication = angular
    .module('liveblog.syndication', ['liveblog.security', 'superdesk.menu']);

liveblogSyndication
    .config(['superdeskProvider', '$provide', function(superdesk, $provide) {
        superdesk
            .activity('/consumers/', {
                label: gettext('Consumers Management'),
                controller: 'ConsumersController',
                templateUrl: 'scripts/liveblog-syndication/views/consumer-list.html',
                category: superdesk.MENU_MAIN,
                priority: 100,
                adminTools: true,
                resolve: {isArchivedFilterSelected: function() {return false;}}
            })
            .activity('/producers/', {
                label: gettext('Producers Management'),
                controller: 'ProducersController',
                templateUrl: 'scripts/liveblog-syndication/views/producer-list.html',
                category: superdesk.MENU_MAIN,
                priority: 100,
                adminTools: true,
                producersBlogs: true,
                resolve: {isArchivedFilterSelected: function() {return false;}}
            });

        //$provide.decorator('sdMenuWrapperDirective', function($delegate) {
        //  var directive, link;
        //  directive = $delegate[0];
        //  link = directive.link;

        //  directive.compile = function() {
        //    return function Link(scope, element, attrs, ctrls) {
        //      return link.apply(this, arguments);
        //    };
        //  };
        //  return $delegate;
        //});

    }])
    .config(['apiProvider', function(apiProvider) {
        apiProvider
            .api('consumers', {
                type: 'http',
                backend: {rel: 'consumers'}
            })
            .api('producers', {
                type: 'http',
                backend: {rel: 'producers'}
            });
    }]);
