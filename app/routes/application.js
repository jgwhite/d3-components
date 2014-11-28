import Ember from 'ember';
import ajax from 'ic-ajax';
import Immutable from '../models/immutable';

export default Ember.Route.extend({
  model: function() {
    return ajax('/data.json').then(function(model) {
      return new Immutable(model);
    });
  },

  actions: {
    addNode: function(name) {
      var model = Ember.copy(this.get('controller.model'));
      model.root.children[0].children.push({ name: name });
      this.set('controller.model', new Immutable(model));
      this.set('controller.newNodeName', null);
    }
  }
});
