/// <reference path="../typings/tsd.d.ts" />
import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
        <input id="search" type="text" class="form-control" placeholder="Search artist..">
    `
})
export class AppComponent {
    constructor(){
        var keyups = Observable.fromEvent($('#search'),"keyup")
        .map( e => e.target.value) // transform elements to different object.
        .filter( text => text.length >= 3) // filter or conditions
        .debounceTime(400) // pause time for avoid not call more times. wait 400s.
        .distinctUntilChanged() // same input not call. if left and right arrow press.
        .flatMap( searchTerm =>
        {
           var url = "https://api.spotify.com/v1/search?type=artist&q="+searchTerm;
           var promise = $.getJSON(url);
           return Observable.fromPromise(promise); // promise is done. json get from server and push it to Observable.
        }); // Transforming input 
        // Use flatMap merge many Observable to one. 
       var subscribe =  keyups.subscribe( data => console.log(data));
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
}