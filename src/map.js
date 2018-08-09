export class Map{
  constructor(cityArray){
    this.cityArray = cityArray;
  }

  createMap(){

    let map = AmCharts.makeChart( "mapdiv", {
      "type": "map",
      "projection": "winkel3",
      "theme": "none",
      "imagesSettings": {
        "rollOverColor": "#089282",
        "rollOverScale": 3,
        "selectedScale": 3,
        "selectedColor": "#089282",
        "color": "#13564e"
      },

      "areasSettings": {
        "unlistedAreasColor": "#15A892",
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
