var app = angular.module('myApp', []);
app.controller('ControlEquipo', function($scope, $http) {
  $http.get("http://104.130.47.10/reporte/api/getEquipos.php").then(function (response) {
      $scope.Data=response.data;
      var ndx = crossfilter(response.data);
      statusDimension = ndx.dimension(function (d) {
          return d.status;
      })
      statusSumGroup = statusDimension.group()
      typeDimension = ndx.dimension(function (d) {
          return d.type;
      })
      var typeGroupCount = typeDimension.group()
          .reduceCount(function (d) {
              return d.type;
          })
      modelDimension = ndx.dimension(function (d) {
          return d.model;
      })
      var modelGroupCount = modelDimension.group()
          .reduceCount(function (d) {
              return d.model;
          })

      //        //        // hospIAL PARTIES INVOLVED IN ASSASSINATIONS (AND ATTEMPTS)        //        //
      var chart1 = dc.pieChart("#parties-id");
      chart1            .width(384)
          .height(240)
          .slicesCap(4)
          .innerRadius(25)
          .dimension(statusDimension)
          .group(statusSumGroup)
          .renderLabel(true)
          .legend(dc.legend())
          .title(function (d) {
              return d.value;
          });

      //        //        // ASSASSINATION TYPES        //        //


      var chart2 = dc.rowChart("#type-id");
      chart2
          .width(480)
          .x(d3.scale.linear().range([6,20]))
          .margins({top: 5, left: 10, right: 10, bottom: 20})
          .colors(d3.scale.category10())
          .dimension(typeDimension)
          .group(typeGroupCount)
          .elasticX(true)
          .xAxis().ticks(5);

      //        //        // TABLE OF hosp, THEIR PARTIES AND ASSASSINATION TYPES        //        //
      var table1 = dc.dataTable("#table-id");
      table1            .width(250).height(800)
          .dimension(statusDimension)
          .group(function (d) {
              return ' '            })
          .size(100)
          .columns([

              function (d) {
                  return d.hosp;
              },
              function (d) {
                  return d.status;
              },
              function (d) {
                  return d.type;
              },

          ])

      dc.renderAll();

  });
});
