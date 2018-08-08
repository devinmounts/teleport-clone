import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Search } from './user.js';

$(document).ready(function() {
    let search = new Search();  // create instance of WeatherService class
    let promise = search.getCities();  // call the instance method

    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      console.log(body._links['ua:item'][0].name);
      console.log(body._links['ua:item']);

      for (let i = 0; i< body._links['ua:item'].length; i++)
      $('#citiesDropdown').append(`<option value="${body._links['ua:item'][i].href}">${body._links['ua:item'][i].name}</option>`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });

    $("#cities-form").submit(function(event){
      event.preventDefault();
      let href = $("#citiesDropdown").val().toLowerCase();
      console.log(href);
      let scoresPromise = search.getCityScores(href);

      scoresPromise.then(function(response) {
        let body = JSON.parse(response);
        console.log(body.categories[0].name);
        console.log(body.categories[0].score_out_of_10);

      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
      });


    });
});
