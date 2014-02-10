getInterventionsByType = function( interventions ) {
  var result = [];
  var totals = _.countBy(interventions, function(i) {
    return i.typeName;
  });
  _.each(totals, function(value, key, list) {
    result.push([key, value]);
  });
  return result;
};

getInterventionsPerWeek = function( interventions ) {
  var result = { categories: [] };
  result.categories = [
    { week: '2014W02', label: 'Wk Ending 9 Jan' },
    { week: '2014W03', label: 'Wk Ending 16 Jan' },
    { week: '2014W04', label: 'Wk Ending 23 Jan' },
    { week: '2014W05', label: 'Wk Ending 2 Feb' },
    { week: '2014W06', label: 'Wk Ending 9 Feb' },
    { week: '2014W07', label: 'Wk Ending 16 Feb' },
    { week: '2014W08', label: 'Wk Ending 23 Feb' },
  ];
  result.series = [
    { name: 'First Aid', data: [0,3,4,1,2,3,8] },
    { name: 'Transport', data: [9,2,3,5,6,2,3] },
    { name: 'Diversion', data: [0,3,1,6,7,3,4] },
    { name: 'Not Selected', data: [6,3,2,4,2,1,6] },
  ];
  var groupedByWeek = _.groupBy( interventions, function(intervention) {
    var label = intervention.startedMoment.isoWeekday(7).format('[Wk Ending] D MMM');
    var sortKey = intervention.startedMoment.format('GGGG[W]WW');
    return label;
  });
  result.categories = _.keys( groupedByWeek );
  totalsGroupedByWeek = {};
  _.each( groupedByWeek, function( interventionsInWeek, weekKey, list ) {
    var totals = _.countBy( interventionsInWeek, function(i) {
      return i.typeName;
    });
    totalsGroupedByWeek[weekKey] = totals;
  });
  console.log(totalsGroupedByWeek)
  return result;
}

Template.report.settings = function() {
  return {
    fields: [
      { key: 'reference', label: 'Reference' },
      { key: 'typeName', label: 'Type' },
      { key: 'status', label: 'Status' },
      { key: 'startedMoment', label: 'Started' },
      { key: 'respondingToName', label: 'Responding To' },
      { key: 'liquorAccordPrecinctName', label: 'Liquor Accord Precinct' },
      { key: 'settingName', label: 'Setting' },
      { key: 'locationDescription', label: 'Location', fn: function (value) { return value || ' '; } }
    ]
  }
};

Template.report.rendered = function() {
  $('#pie-intervention-types').highcharts({
    title: { text: 'Interventions by Type' },
    tooltip: {pointFormat: 'Total: {point.y}<br> <b>{point.percentage:.1f}%</b>'},
    series: [{
      type: 'pie',
      name: 'Interventions by Type',
      data: getInterventionsByType( this.data.interventions ),
    }],
  });

  var interventionsPerWeek = getInterventionsPerWeek( this.data.interventions );
  $('#line-interventions-per-week').highcharts({
    chart: { type: 'column' },
    title: { text: 'Interventions by Type per Week' },
    //subtitle: { text: 'ddmmyy to ddmmyy' },
    xAxis: {
      title: { text: 'Week' },
      categories: interventionsPerWeek.categories,
    },
    yAxis:  {
      min: 0,
      title: { text: 'Interventions' },
    },
    tooltip: {
      headerFormat: '{point.key}',
      pointFormat: '{series.color} {series.name}',
      useHTML: true,
    },
    series: interventionsPerWeek.series,
  });


};