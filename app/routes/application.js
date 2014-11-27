import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {
      name: 'Simple',
      children: [{
        name: 'A',
      }, {
        name: 'B'
      }]
    };
  }
});
