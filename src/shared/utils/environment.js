const environments = ['development', 'stage', 'qa', 'production'];

export function getEnvironment(env = false) {
  const environment = env || process.env.NODE_ENV;

  return isEnvironment(environment) ? environment : 'production';
}

export function isEnvironment(env) {
  return environments.indexOf(env) !== -1;
}
