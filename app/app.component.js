System.register(['angular2/core', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    var keyups = Rx_1.Observable.fromEvent($('#search'), "keyup")
                        .map(function (e) { return e.target.value; }) // transform elements to different object.
                        .filter(function (text) { return text.length >= 3; }) // filter or conditions
                        .debounceTime(400) // pause time for avoid not call more times. wait 400s.
                        .distinctUntilChanged() // same input not call. if left and right arrow press.
                        .flatMap(function (searchTerm) {
                        var url = "https://api.spotify.com/v1/search?type=artist&q=" + searchTerm;
                        var promise = $.getJSON(url);
                        return Rx_1.Observable.fromPromise(promise); // promise is done. json get from server and push it to Observable.
                    }); // Transforming input 
                    // Use flatMap merge many Observable to one. 
                    var subscribe = keyups.subscribe(function (data) { return console.log(data); });
                    subscribe.unsubscribe(); // Help in real word app to user turn off multiple notifications.       
                    // var debounced =  _.debounce(function(text){
                    //     var url = "https://api.spotify.com/v1/search?type=artist&q="+text;
                    //     $.getJSON(url, function(artists){
                    //         console.log(artists);
                    //     })
                    // }, 400);
                    // $('#search').keyup(function(e){
                    //     var text = e.target.value;
                    //     if(text.length < 3)
                    //         return;
                    //    debounced(text);
                    // });
                    //  $('#search').keyup(function(e){
                    //      var text = e.target.value;
                    //      console.log(text);
                    //  });   
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <input id=\"search\" type=\"text\" class=\"form-control\" placeholder=\"Search artist..\">\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map