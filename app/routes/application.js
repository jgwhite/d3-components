import Ember from 'ember';
import ajax from 'ic-ajax';
import Immutable from '../models/immutable';

export default Ember.Route.extend({
  model: function() {
    return ajax('/data.json').then(function(model) {
      return new Immutable(model);
    });
  }
});
