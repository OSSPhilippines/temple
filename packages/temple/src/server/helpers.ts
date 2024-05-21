/**
 * Converts a string into camel format
 * ie. "some string" to "someString"
 */
export function camelize(string: string, lower = false) {
  const camel = string.trim()
    //replace special characters with underscores
    .replace(/[^a-zA-Z0-9]/g, '_')
    //replace multiple underscores with a single underscore
    .replace(/_{2,}/g, '_')
    //trim underscores from the beginning and end of the string
    .replace(/^_+|_+$/g, '')
    //replace underscores with capital
    .replace(/([-_][a-z0-9])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
  return lower ? lowerlize(camel): capitalize(camel);
}

/**
 * Converts a word into capital format
 * ie. "title" to "Title"
 */
export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Converts a word into lower format
 * ie. "Title" to "title"
 */
export function lowerlize(word: string) {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

/**
 * Converts a title to a slug
 * ie. "Some Title" or "SomeTitle" to "some-title"
 */
export function slugify(string: string) {
  return string
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .toLowerCase();
}