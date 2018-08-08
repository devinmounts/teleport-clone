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
      $('#citiesDropdown').append(`<option>${body._links['ua:item'][i].name}</option>`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });

    console.log(body);
});
