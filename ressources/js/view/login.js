define([
    'backbone',
    'underscore',
    'jquery',
    'jqueryCookie',
    'bootstrap',
    'text!template/login_Template.html',
], function(Backbone,_,$,Cookie,Bootstrap, LoginTemplate) {

    var LoginView = Backbone.View.extend({
        template: _.template(LoginTemplate),
        el: '#main_container',

        events: {
            "click #loginButton": "login"
        },

        initialize: function () {

        },

        render:function () {
            this.$el.html(LoginTemplate);
        },

        login:function (event) {
            event.preventDefault();
            var url = 'https://umovie.herokuapp.com/login';
            var formValues = {
                email: $('#inputEmail').val(),
                password: $('#inputPassword').val()
            };

            $.ajax({
                url:url,
                type:'POST',
                dataType:"json",
                data: formValues,
                success:function (data) {
                    console.log(data);
                    $.cookie('auth_token', data.token);
                    window.location.replace('#home');
                },
                error:function (data){
                    console.log(data);
                    if(data.status == 401){
                        $('.alert-error').text("email/password incorrect").show();
                    }else{
                        $('.alert-error').text("unexpected error").show();
                    }
                    //window.location.replace('#home');

                }
            });
        }
    });

    return LoginView;
});