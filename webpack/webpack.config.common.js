// Configuration
const rules = require('./configuration/rules');
const modules = require('./configuration/modules');
const extensions = require('./configuration/extensions');

module.exports = type => {
  return {
    module: {
      rules: rules(type)
    },
    resolve: {
      extensions: extensions(),
      modules: modules()
    }
  };
};
