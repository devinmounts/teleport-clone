import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Search } from './user.js';
import { Chart } from './chart.js';

$(document).ready(function() {

    let search = new Search();  // create instance of WeatherService class
    let promise = search.getCities();  // call the instance method
    let names = [];

    promise.then(function(response) {
      let body = JSON.parse(response);

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
      let city1 = $("#citiesDropdown1").find(":selected").text();
      let city2 = $("#citiesDropdown2").find(":selected").text();
      names[0] = city1;
      names[1] = city2;
      let scoresPromise1 = search.getCityScores(href1);
      let scoresPromise2 = search.getCityScores(href2);
      let objectArray = [];

      scoresPromise1.then(function(response) {
        let body = JSON.parse(response);
        let i = 0;
        body.categories.forEach((category) => {
          let objects = {};
          let name = category.name;
          let score = -category.score_out_of_10.toFixed(2);
          objects.categories = name;
          objects[city1] = score;
          objectArray[i] = objects;
          i++;
        });
        scoresPromise2.then(function(response) {
          let body = JSON.parse(response);
          let i = 0;
          body.categories.forEach((category) => {
            let score = category.score_out_of_10.toFixed(2);
            objectArray[i][city2] = score;
            i++;
          });
          let chart = new Chart(objectArray, names[0], names[1]);
          chart.makeChart();
        }, function(error) {
          $('.showErrors').text(`There was an error processing your request: ${error.message}`);
        });
      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
      });





    });
});

// [{
//   "categories": "housing",
//   "male": -1,
//   "female": 1
// },
// {
//   "categories": "bananas",
//   "male": -50,
//   "female": 50
// }];
