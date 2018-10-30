import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  modelNameFromPayloadKey() {
    return 'clinical-provider';
  },
  keyForAttribute(key) {
    return key;
  },
});
