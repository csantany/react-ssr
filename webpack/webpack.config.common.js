// Configuration
import { rules, extensions, modules } from './configuration';

export default type => {
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
