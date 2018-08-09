export class Chart{
  constructor(objectArray, city1, city2){
    this.objectArray = objectArray;
    this.city1 = city1;
    this.city2 = city2;
  }

  makeChart(){
    let chart = AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "dark",
      "rotate": true,
      "marginBottom": 50,
      "dataProvider": this.objectArray,
      "startDuration": 1,
      "graphs": [{
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": this.city1,
        "title": this.city1,
        "labelText": "[[value]]",
        "clustered": false,
        "labelFunction": function(item) {
          return Math.abs(item.values.value);
        },
        "balloonFunction": function(item) {
          return item.category + ": " + Math.abs(item.values.value);
        }
      }, {
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": this.city2,
        "title": this.city2,
        "labelText": "[[value]]",
        "clustered": false,
        "labelFunction": function(item) {
          return Math.abs(item.values.value);
        },
        "balloonFunction": function(item) {
          return item.category + ": " + Math.abs(item.values.value);
        }
      }],
      "categoryField": "categories",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0.2,
        "axisAlpha": 0
      },
      "valueAxes": [{
        "gridAlpha": 0,
        "ignoreAxisWidth": true,
        "labelFunction": function(value) {
          return Math.abs(value);
        },
        "guides": [{
          "value": 0,
          "lineAlpha": 0.2
        }]
      }],
      "balloon": {
        "fixedPosition": true
      },
      "chartCursor": {
        "valueBalloonsEnabled": false,
        "cursorAlpha": 0.05,
        "fullWidth": true
      },
      "allLabels": [{
        "text": this.city1,
        "x": "28%",
        "y": "97%",
        "bold": true,
        "align": "middle"
      }, {
        "text": this.city2,
        "x": "75%",
        "y": "97%",
        "bold": true,
        "align": "middle"
      }],
     "export": {
        "enabled": true
      }

    });
  }
}
