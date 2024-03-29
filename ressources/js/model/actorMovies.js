define([
    'backbone',
    'underscore',
    'jquery',
    'bootstrap',
    'collection/actorMoviesCollection'
], function(Backbone,_,$,Bootstrap, actorMoviesCollection){

    var actorMoviesModel = Backbone.Model.extend({
        defaults: function() {
            return {
                actorMovies: new actorMoviesCollection
            };
        },

        parse: function(response){
            this.id = response.id;
            console.log(response);
            return response;
        },

        /*validate: function(attrs){
            if(!attrs.name || !attrs.owner || attrs.name === '' || attrs.owner === ''){
                return 'Please enter a valid name or/and a valid owner !';
            }
        }*/
    });

    return actorMoviesModel;

});