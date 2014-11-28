import Ember from 'ember';
var IC = I({}).constructor;

var Immutable = Ember.Object.extend(Ember.Array, Ember.Enumerable, Ember.Copyable, {
  oak: null,
  isFrozen: true,

  init: function(value) {
    this.set('oak', I(value || {}));
  },

  unknownProperty: function(key) {
    return oakOrPrimitive(this.get('oak')(key));
  },

  setUnknownProperty: function(key, value) {
    throw Ember.FROZEN_ERROR;
  },

  length: function() {
    return this.get('oak')
      .reduce(function (a) { return a + 1; }, 0);
  }.property('oak'),

  objectAt: function(index) {
    return oakOrPrimitive(this.get('oak')(index));
  },

  copy: function() {
    return this.get('oak').dump();
  }
});

Immutable[Ember.NAME_KEY] = 'Immutable';

function oakOrPrimitive(obj) {
  if (isAncientOak(obj)) {
    return new Immutable(obj);
  } else {
    return obj;
  }
}

function isAncientOak(obj) {
  return obj instanceof IC;
}

export default Immutable;
