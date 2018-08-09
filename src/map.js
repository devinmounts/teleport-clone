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
        "scale": 6,
        "rollOverColor": "#089282",
        "rollOverScale": 8,
        "selectedScale": 8,
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
