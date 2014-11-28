import DS from 'ember-data';

export default DS.Model.extend({
  name:     DS.attr('string'),
  parent:   DS.belongsTo('node', {inverse: 'children'}),
  children: DS.hasMany('node', {async: true, inverse: 'parent'}),

  childrenHashFormats: Em.computed.mapBy('children', 'hashFormat'),

  hashFormat: function() {
    return { name: this.get('name'), children: this.get('childrenHashFormats') };
  }.property('name', 'childrenHashFormats'),
});
