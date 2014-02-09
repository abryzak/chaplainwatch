Template.report.settings = function() {
  return {
    fields: [
      { key: 'reference', label: 'Reference' },
      { key: 'type', label: 'Type' },
    ]
  }
}

Template.report.rendered = function() {
  var interventions = this.data.interventions;
  var totals = _.countBy(interventions, function(i) {
    return i.type;
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