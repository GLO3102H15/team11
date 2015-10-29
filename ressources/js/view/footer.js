define([
    'backbone',
    'text!template/footer.html'
], function(Backbone,FooterTemplate){

    var FooterView = Backbone.View.extend({
        el: $("footer"),
        initialize:function(){
            this.$el.html(FooterTemplate);
        },
        render: function(){
            //this.$el.html(menuBarTemplate);
            console.log('allo!');
        }

    });

    return FooterView;

});
