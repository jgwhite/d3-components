import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model: function() {
    return ajax('/data.json').then(function(complex) {
      return {
        complex: complex,
        simple: {
          name: 'Simple',
          children: [{
            name: 'A',
          }, {
            name: 'B'
          }]
        }
      };
    });
  }
});
