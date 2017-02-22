
        // DATA, DIMENSIONS AND GROUPS
        var ndx = crossfilter(assassinationData);
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
        descriptDimension=ndx.dimension(function (d) {
            return d.descrip;
        })
        var descriptGroup=descriptDimension.group();    

        //        //        // hospIAL PARTIES INVOLVED IN ASSASSINATIONS (AND ATTEMPTS)        //        //
        var chart1 = dc.pieChart("#parties-id");
        chart1.width(270)
            .height(200)
            .slicesCap(4)
            .innerRadius(25)
            .dimension(statusDimension)
            .group(statusSumGroup)
		                 		.legend(dc.legend().x(30).y(190).itemHeight(7).gap(3).legendText(function(d) {return  d.name+": "+d.data; }))


        //        //        // ASSASSINATION TYPES        //        //


        var chart2 = dc.rowChart("#type-id");
        chart2
            .width(230)
            .height(200)
            .x(d3.scale.linear().range([6,20]))
            .margins({top: 5, left: 10, right: 10, bottom: 20})
            .colors(d3.scale.category10())
            .dimension(typeDimension)
            .group(typeGroupCount)
            .elasticX(true)
            .xAxis().ticks(5);
        //        //        // TABLE OF hosp, THEIR PARTIES AND ASSASSINATION TYPES        //        //

        var table1 = dc.dataTable("#table-id");
        table1.height(800)
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
			    function (d) {
                    return d.type;
                },

            ]);
 //        //        // TABLE OF descripcion,         //        //
        
        var list = dc.pieChart('#piedesc-id');
        list.width(500).height(200)
            .slicesCap(Infinity)
            .innerRadius(15)
            .dimension(descriptDimension)
            .group(descriptGroup)
            .renderLabel(true)
            .legend(dc.legend())
            .title(function (d) {
                return d.value;
            })
            .legend(dc.legend().x(200).y(9).itemHeight(10).gap(4))
            .label(function(d){});
            list.renderlet(function (chart) {
           // rotate x-axis labels
           list.selectAll('g.pie-slice-group')
             .attr('transform', 'translate(-100,0)')});




          

        dc.renderAll();