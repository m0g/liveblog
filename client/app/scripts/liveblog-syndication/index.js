var liveblogSyndication = angular
    .module('liveblog.syndication', ['liveblog.security']);

liveblogSyndication
    .config(['superdeskProvider', function(superdesk) {
        superdesk.activity('/consumers', {
            label: gettext('Consumers Management'),
            controller: 'ConsumerController',
            templateUrl: 'scripts/liveblog-syndication/views/list.html',
            category: superdesk.MENU_MAIN,
            priority: 100,
            adminTools: true,
            resolve: {isArchivedFilterSelected: function() {return false;}}
        });
    }])
    .config(['apiProvider', function(apiProvider) {
        apiProvider.api('consumers', {
            type: 'http',
            backend: {rel: 'consumers'}
        });
    }]);