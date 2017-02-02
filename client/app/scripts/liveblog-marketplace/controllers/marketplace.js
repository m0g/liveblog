liveblogMarketplace
    .controller('MarketplaceController', 
        ['$scope', 'Store', 'MarketplaceActions', 'MarketplaceReducers',
        function($scope, Store, MarketplaceActions, MarketplaceReducers) {
            $scope.states = [
                'Marketers',
                'Producers'
            ];

            $scope.activeState = $scope.states[0];

            $scope.switchTab = function(state) {
                $scope.activeState = state;
            };

            $scope.togglePanel = function() {
                MarketplaceActions.togglePanel(!$scope.searchPanel);
            };

            $scope.store = new Store(MarketplaceReducers, {
                blogs: { _items: {} },
                marketers: { _items: {} },
                filters: {},
                searchPanel: true
            });

            $scope.store.connect(function(state) {
                $scope.blogs = state.blogs;
                $scope.searchPanel = state.searchPanel;
            });

            MarketplaceActions.getBlogs();
            MarketplaceActions.getMarketers();
        }]);
