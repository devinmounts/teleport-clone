export class Search {
  getCities() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.teleport.org/api/urban_areas/`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  getCityScores(href) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `${href}scores`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}

{
  "categories": "housing",
  "male": -1,
  "female": 1
},
{
  "categories": "bananas",
  "male": -50,
  "female": 50
}];
