/**
 * Converts a string to a slug
 */
export function slugify(str: string, noDash = false, noLine = false) {
  return str.trim()
    //replace special characters with dashes (or underscores)
    .replace(/[^a-zA-Z0-9\-_]/g, noLine ? '-': '_')
    //replace dashes with underscores (or dashes if allowed)
    .replace(/-/g, noLine ? '-': '_')
    //replace dashes with underscores (or dashes if allowed)
    .replace(/_/g, noDash ? '_': '-')
    //replace multiple dashes with a single dash
    .replace(/-{2,}/g, '-')
    //replace multiple underscores with a single underscore
    .replace(/_{2,}/g, '_')
    //trim dashes and underscores from the beginning and end of the string
    .replace(/^-+|-+$/g, '')
    .replace(/^_+|_+$/g, '')
    //convert to lowercase
    .toLowerCase();
};

/**
 * Converts a string to camel case
 */
export function camelfy(str: string) {
  return str.trim()
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
}