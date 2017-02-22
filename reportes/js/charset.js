var data=[{}]


var assassinationData = [
    {president: 'Abraham Lincoln', party: 'FUNCIONAL', atype: 'assassinated'},
    {president: 'James A. Garfield', party: 'FUNCIONAL', atype: 'assassinated'},
    {president: 'William McKinley', party: 'FUNCIONAL', atype: 'assassinated'},
    {president: 'John F. Kennedy', party: 'FUNCIONAL', atype: 'assassinated'},
    {president: 'Abraham Lincoln', party: 'FUNCIONAL',atype: 'attempted-assassination'},
    {president: 'Abraham Lincoln', party: 'FUNCIONAL', atype: 'attempted-assassination'},
    {president: 'John F. Kennedy', party: 'Democratic',atype: 'attempted-assassination'},
    {president: 'Andrew Jackson', party: 'Democratic', atype: 'attempted-assassination'},
    {president: 'William Howard Taft', party: 'Republican', atype: 'attempted-assassination'},
    {president: 'Theodore Roosevelt', party: 'Republican', atype: 'attempted-assassination'},
    {president: 'Herbert Hoover', party: 'Republican', atype: 'attempted-assassination'},
    {president: 'Franklin D. Roosevelt', party: 'Republican', atype: 'attempted-assassination'},
    {president: 'Franklin D. Roosevelt', party: 'Republican', atype: 'attempted-assassination'},
    {president: 'Harry S. Truman', party: 'Democratic', atype: 'attempted-assassination'},
    {president: 'Harry S. Truman', party: 'Democratic', atype: 'attempted-assassination'},
    {president: 'Richard Nixon', party: 'Republican',  atype: 'attempted-assassination'},
    {president: 'Richard Nixon', party: 'Republican',  atype: 'attempted-assassination'},
    {president: 'Gerald Ford', party: 'Republican',atype: 'attempted-assassination'},
    {president: 'Gerald Ford', party: 'Republican', atype: 'attempted-assassination'},
    {president: 'Jimmy Carter', party: 'Democratic', atype: 'attempted-assassination'},
    {president: 'Ronald Reagan', party: 'Republican',atype: 'attempted-assassination'},
    {president: 'George H.W. Bush', party: 'Republican',atype: 'attempted-assassination'},
    {president: 'Bill Clinton', party: 'Democratic',atype: 'attempted-assassination'},
    {president: 'Bill Clinton', party: 'Democratic',atype: 'attempted-assassination'},
    {president: 'Bill Clinton', party: 'Democratic',atype: 'attempted-assassination'},
    {president: 'Bill Clinton', party: 'Democratic',atype: 'attempted-assassination'},
    {president: 'George W. Bush', party: 'Republican', atype: 'attempted-assassination'},
    {president: 'George W. Bush', party: 'Republican', atype: 'attempted-assassination'},
    {president: 'Barack Obama', party: 'Democratic', atype: 'attempted-assassination'},
    {president: 'Barack Obama', party: 'Democratic', atype: 'attempted-assassination'},
    {president: 'Barack Obama', party: 'Democratic', atype: 'attempted-assassination'},
    {president: 'Zachary Taylor', party: 'Democratic', atype: 'rumored-assassination'},
    {president: 'Warren G. Harding', party: 'Republican', atype: 'rumored-assassination'},
];

// DATA, DIMENSIONS AND GROUPS
var ndx = crossfilter(assassinationData);
partyDimension = ndx.dimension(function (d) {
    return d.party;
})
partySumGroup = partyDimension.group()
atypeDimension = ndx.dimension(function (d) {
    return d.atype;
})
var atypeGroupCount = atypeDimension.group()
    .reduceCount(function (d) {
        return d.atype;
    })
modelDimension = ndx.dimension(function (d) {
    return d.model;
})
var modelGroupCount = modelDimension.group()
    .reduceCount(function (d) {
        return d.model;
    })

//        //        // PRESIDENTIAL PARTIES INVOLVED IN ASSASSINATIONS (AND ATTEMPTS)        //        //
var chart1 = dc.pieChart("#parties-id");
chart1            .width(384)
    .height(240)
    .slicesCap(4)
    .innerRadius(25)
    .dimension(partyDimension)
    .group(partySumGroup)
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
    .dimension(atypeDimension)
    .group(atypeGroupCount)
    .elasticX(true)
    .xAxis().ticks(5);

//        //        // TABLE OF PRESIDENT, THEIR PARTIES AND ASSASSINATION TYPES        //        //
var table1 = dc.dataTable("#table-id");
table1            .width(250).height(800)
    .dimension(partyDimension)
    .group(function (d) {
        return ' '            })
    .size(100)
    .columns([

        function (d) {
            return d.president;
        },
        function (d) {
            return d.party;
        },
        function (d) {
            return d.atype;
        },

    ])

dc.renderAll();
