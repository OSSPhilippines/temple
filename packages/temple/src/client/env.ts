import data from './data';

/**
 * Get the environment variables
 */
function env(): Record<string, string>;
function env(name?: string) {
  const env = (data.get('env') || {}) as Record<string, string>;
  if (name) {
    return env[name] || null;
  }
  return env;
};

export default env;