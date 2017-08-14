// Utils
import { getEnvironment } from '../utils/environment';

// Configuration
import development from '../../../config/development.json';
import production from '../../../config/production.json';

// Saving all configurations
const configs = {
  development,
  production
};

// Config container
const config = configs[getEnvironment()];

export function $config() {
  return config;
}

export function $isDevelopment() {
  return getEnvironment() === 'development';
}

export function $isProduction() {
  return getEnvironment() === 'production';
}

export function $serverPort() {
  return process.env.PORT || $config().serverPort;
}

export function $webpack() {
  return $config().webpack;
}
