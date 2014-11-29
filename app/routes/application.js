import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var pushData = {
      nodes: [
        {id: 1, name: 'root',    children: [2, 3] },
        {id: 2, name: 'branch1', children: [4, 5] },
        {id: 3, name: 'branch2', children: [6] },
        {id: 4, name: 'leaf1',   children: [] },
        {id: 5, name: 'leaf2',   children: [] },
        {id: 6, name: 'leaf3',   children: [] },
      ]
    };

    this.store.pushPayload('node', pushData);
  },


  model: function() {
    return this.store.find('node', 1);
    //return ajax('/data.json').then(function(model) {
      //return new Immutable(model);
    //});
  },

  actions: {
    addNode: function(name) {
      var model = this.get('controller.model');
      var children = model.get('children');
      var newChild = this.store.createRecord('node', {name: name});
      children.pushObject(newChild);
      this.set('controller.model', model);
      this.set('controller.newNodeName', null);
    }
  }
});
