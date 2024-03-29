define([
    'jquery',
    'underscore',
    'backbone',
    'view/home',
    'view/footer',
    'collection/SearchableCollection',
    'view/general_search',
    'view/movie',
    'view/menu',
    'view/watchlist',
	'view/actor',
    'view/actorMovies',
    'view/tvshow'
], function($, _, Backbone,HomeView, FooterView,SearchableCollection,GSView,MovieView, MenuView, WatchListView, ActorView,ActorMoviesView,TvShowView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'home':'home',
            'movies/:id': 'movie',
            'tvshows/seasons/:id' : 'tvshow',
			'actors/:id': 'actor',
            'actors/:id/movies': 'actorMovies',
            'search/query:q':'search',
            'search/query:q/genre:g':'search',
            'watchlist' : 'watchlist',
            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter;

        app_router.on('route:home', function(){
            new HomeView().render();
        });

        app_router.on('route:defaultAction', function(){
            // Ici on va mettre la page de login
            app_router.navigate('home',{trigger:true});
        });
        app_router.on('route:movie', function(id){
            var movieView = new MovieView();
            movieView.render({id: id});
        });

        app_router.on('route:tvshow', function(id){
            var tvshowView = new TvShowView();
            tvshowView.render({id: id});
        });
        app_router.on('route:search', function(q){
            var gSearch = SearchableCollection.extend({url: 'http://localhost:3000/unsecure/'});
            gSearch.search(q).done(function(results){
                new GSView({collection:results}).render();
            });
            app_router.navigate('search');
        });
        app_router.on('route:search', function(q){
            var gSearch = SearchableCollection.extend({url: 'http://localhost:3000/unsecure/'});
            gSearch.search(q).done(function(results){
               new GSView({collection:results}).render();
            });
            app_router.navigate('search');
        });

        app_router.on('route:watchlist', function(){
            var watchListView = new WatchListView();
            watchListView.render();

        });
		
		app_router.on('route:actor', function(id){
            var actorView = new ActorView();
            actorView.render({id: id});
            var actorMoviesView = new ActorMoviesView();
            actorMoviesView.render({id: id});

        });
        app_router.on('route:actorMovies', function(id){
            var actorMoviesView = new ActorMoviesView();
            actorMoviesView.render({id: id});
        });

        // Unlike the above, we don't call render on this view as it will handle
        // the render call internally after it loads data. Further more we load it
        // outside of an on-route function to have it loaded no matter which page is
        // loaded initially.
        var menuView = new MenuView();
        var footerView = new FooterView();

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});