import DS from 'ember-data';

export default DS.Model.extend({
  callToBook: DS.attr('boolean'),
  description: DS.attr('string'),
  duration: DS.attr('string'),
  rate: DS.attr('string'),
});
