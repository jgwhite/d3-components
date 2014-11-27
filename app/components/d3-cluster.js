import Ember from 'ember';

export default Ember.Component.extend({
  cluster: function() {
    var width = this.get('width'),
        height = this.get('height');

    return d3.layout.cluster().size([height, width - 160]);
  }.property('width', 'height'),

  nodes: function() {
    var cluster = this.get('cluster');
    var root = this.get('root');

    return cluster.nodes(root);
  }.property('root', 'cluster'),

  links: function() {
    var cluster = this.get('cluster');
    var nodes = this.get('nodes');

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var links = cluster.links(nodes);

    links.forEach(function(link) {
      link.d = diagonal(link);
    });

    return links;
  }.property('cluster', 'nodes')
});
