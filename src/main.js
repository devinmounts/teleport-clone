import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Search } from './user.js';
import { Chart } from './chart.js';
import { Map } from './map.js';

$(document).ready(function() {

    let search = new Search();  // create instance of WeatherService class
    let promise = search.getCities();  // call the instance method
    let names = [];
    let latlon = [];

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
      let locationPromise1 = search.getLatLon(href1);
      let locationPromise2 = search.getLatLon(href2);
      console.log(href2);
      let objectArray = [];
      let targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
      let cityArray = [];

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

      // console.log(cityArray);


      locationPromise1.then(function(response) {
        let body = JSON.parse(response);
        console.log(body);
        let object1 = {};
        let lon = body.bounding_box.latlon.east;
        let lat = body.bounding_box.latlon.north;
        let name = body.name;
        object1["svgPath"] = targetSVG;
        object1["zoomLevel"] = 5;
        object1["scale"] = 1;
        object1["title"] = name;
        object1["latitude"] = lat;
        object1["longitude"] = lon;
        console.log(object1);
        cityArray[0] = object1;

        locationPromise2.then((response) => {
          let body = JSON.parse(response);
          let object2 = {};
          let lon = body.bounding_box.latlon.east;
          let lat = body.bounding_box.latlon.north;
          let name = body.name;
          object2["svgPath"] = targetSVG;
          object2["zoomLevel"] = 5;
          object2["scale"] = 1;
          object2["title"] = name;
          object2["latitude"] = lat;
          object2["longitude"] = lon;
          cityArray[1] = object2;
          console.log(object2);
          let map = new Map(cityArray);
          map.createMap();
        }, function(error) {
          $('.showErrors').text(`There was an error processing your request: ${error.message}`);
        });

      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
      });


    //   let cityArray = [{
    //   "svgPath": targetSVG,
    //   "zoomLevel": 5,
    //   "scale": 0.5,
    //   "title": "Yaounde",
    //   "latitude": 3.8612,
    //   "longitude": 11.5217
    // }]
  });
});
