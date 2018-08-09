import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Search } from './user.js';
import { Chart } from './chart.js';

$(document).ready(function() {
    let chart = new Chart();
    chart.makeChart();
    let search = new Search();  // create instance of WeatherService class
    let promise = search.getCities();  // call the instance method

    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      console.log(body._links['ua:item'][0].name);
      console.log(body._links['ua:item']);

      for (let i = 0; i< body._links['ua:item'].length; i++) {
      let href = body._links['ua:item'][i].href;
      let name = body._links['ua:item'][i].name;
      $('#citiesDropdown1').append(`<option value="${href}">${name}</option>`);
      $('#citiesDropdown2').append(`<option value="${href}">${name}</option>`);
    }}, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });

    $("#cities-form").submit(function(event){
      event.preventDefault();
      let href1 = $("#citiesDropdown1").val().toLowerCase();
      let href2 = $("#citiesDropdown2").val().toLowerCase();
      console.log(href1);
      console.log(href2);
      let scoresPromise1 = search.getCityScores(href1);
      let scoresPromise2 = search.getCityScores(href2);

      scoresPromise1.then(function(response) {
        let body = JSON.parse(response);
        console.log(body.categories[0].name);
        console.log(body.categories[0].score_out_of_10);

      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
      });
      
      scoresPromise2.then(function(response) {
        let body = JSON.parse(response);
        console.log(body.categories[0].name);
        console.log(body.categories[0].score_out_of_10);

      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
      });


    });
});
