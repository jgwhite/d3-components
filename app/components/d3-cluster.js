import Ember from 'ember';

export default Ember.Component.extend({
  root: function() {
    return this.get('data.hashFormat');
  }.property('data.hashFormat'),

  setup: function() {
    var element = this.get('element');

    var width = this.get('width'),
        height = this.get('height');

    var svg = d3.select(element).append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(40,0)");

    this.set('svg', svg);

    this.renderCluster();
  }.on('didInsertElement'),

  renderCluster: function() {
    var root = Ember.copy(this.get('root'));
    var svg = this.get('svg');

    var width = this.get('width'),
        height = this.get('height');

    var cluster = d3.layout.cluster()
        .size([height, width - 160]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var nodes = cluster.nodes(root),
        links = cluster.links(nodes);

    var link = svg.selectAll(".link")
        .data(links)
        .attr("d", diagonal)
      .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

    var node = svg.selectAll(".node")
        .data(nodes)
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        })
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

    node.append("circle")
        .attr("r", 4.5);

    node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { return d.name; });
  }.observes('root.children.@each')
});

