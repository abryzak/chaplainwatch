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
}

Template.report.rendered = function() {
  var interventions = this.data.interventions;
  var totals = _.countBy(interventions, function(i) {
    return i.typeName;
  });
  var chartData = [];
  _.each(totals, function(value, key, list) {
    chartData.push([key, value]);
  });
  var series = [{
    type: 'pie',
    name: 'Interventions by Type',
    data: chartData,
  }];

  $('#container').highcharts({
    chart: {},
    title: 'Interventions by Type',
    tooltip: {pointFormat: 'Total: {point.y}<br> <b>{point.percentage:.1f}%</b>'},
    series: series,
  })

};