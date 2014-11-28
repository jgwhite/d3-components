import Ember from 'ember';

var WIDTH_ADJUSTER = 160;

export default Ember.Component.extend({
  cluster: function() {
    var width = this.get('width'),
        height = this.get('height');

    return d3.layout.cluster()
      .size([height, width - WIDTH_ADJUSTER]);
  }.property('width', 'height'),

  nodes: function() {
    var root = this.get('root');
    root = Ember.copy(root, true);
    var cluster = this.get('cluster');

    return cluster.nodes(root);
  }.property('root', 'cluster'),

  links: function() {
    var nodes = this.get('nodes');
    var cluster = this.get('cluster');

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var links = cluster.links(nodes);

    links.forEach(function(link) {
      link.d = diagonal(link);
    });

    return links;
  }.property('nodes', 'cluster')
});
