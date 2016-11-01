liveblogSyndication
    .controller('SyndicationProducerBlogsController', 
        ['$scope', 'api', '$routeParams', '$http', 'config', 
        function($scope, api, $routeParams, $http, config) {
            api.get('/producers/' + $routeParams.id)
                .then(function(producer) {
                    $scope.producer = producer;
                });

            console.log('config', config);
            api.get('/producers/' + $routeParams.id + '/blogs')
                .then(function(blogs) {
                    console.log('blogs', blogs);
                    $scope.blogs = blogs;
                    $scope.blogsLoading = false;
                    $scope.blogsView = 'grid';
                });

            $scope.syndicate = function(blog) {
                var uri = config.server.url + 
                    '/producers/' + $routeParams.id + 
                    '/syndicate/' + blog._id;

                if (!blog.syndicated)
                    return;

                // I'm using angular default $http service because I couldn't manage
                // to have the superdesk api service to do what I want.
                $http.post(uri, { consumer_blog_id: '581737af5e54324535fdb9fc' })
                    .then(function(response) {
                        console.log('response', response);
                    })
                    .catch(function(err) {
                        console.log('err', err);
                    });
            };
        }])
