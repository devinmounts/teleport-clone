export class Map{
  constructor(cityArray){
    this.cityArray = cityArray;
  }

  createMap(){

    let map = AmCharts.makeChart( "mapdiv", {
      "type": "map",
      "projection": "winkel3",
      "theme": "dark",
      "imagesSettings": {
        "rollOverColor": "#089282",
        "rollOverScale": 3,
        "selectedScale": 3,
        "selectedColor": "red",
        "color": "red"
      },

      "areasSettings": {
        "unlistedAreasColor": "blue",
        "outlineThickness": 0.1
      },

      "dataProvider": {
        "map": "worldLow",
        "images": this.cityArray
      },
      "export": {
        "enabled": true
      }
    } );
  }
}
