/**
 * Number Options
 */
export type NumberOptions = {
  min?: number,
  max?: number,
  separator?: string,
  decimal?: string,
  decimals?: number,
  absolute?: boolean
};

/**
 * Toggles the negative sign
 */
export function toggleNegative(value: string, absolute: boolean) {
  const isNegative = (value.match(/\-/g) || []).length % 2;
  const negative = !absolute && isNegative ? '-' : '';
  value = value.replaceAll('-', '');
  value = value.replace(new RegExp('^0+', 'g'), '');
  return negative + value;
}

/**
 * Fixes the decimal length
 */
export function fixDecimal(
  value: string, 
  decimal: string, 
  decimals: number, 
  cursor: number
) {
  if (decimals < 0) {
    return value;
  }
  if (!decimals) {
    return value.replaceAll(decimal, '');
  }

  cursor = cursor || value.lastIndexOf(decimal);
  //if more than one decimal, then make it only one
  const allDecimals = new RegExp(`\\${decimal}`, 'g');
  if ((value.match(allDecimals) || []).length > 1) {
    //split up the text from where the cursor is
    value = [
      value.substring(0, cursor).replaceAll(decimal, ''), 
      value.substring(cursor + 1).replaceAll(decimal, '')
    ].join(decimal);
  }

  //if more decimals than allowed
  if ((value.split(decimal)[1] || '').length > decimals) {
    //remove the number before the cursor
    value = value.substring(0, value.length - 1);
  }

  return value;
}

/**
 * Returns true if the value is between the min and max
 */
export function between(value: string, min?: number, max?: number) {
  if (min && !isNaN(min) && parseFloat(value) < min) {
    value = String(min);
  }
  if (max && !isNaN(max) && parseFloat(value) > max) {
    value = String(max);
  }
  return value;
}

/**
 * Adds decimal numbers to the value
 */
export function padDecimals(value: string, decimal: string, decimals: number) {
  if (!decimals || !value.length) {
    return value;
  }

  //if the decimal is the last (with no number)
  if (value[value.length - 1] === decimal) {
    //remove it
    value = value.substring(0, value.length - 1);
  }
  //if no decimals
  const allDecimals = new RegExp(`\\${decimal}`, 'g');
  if (!(value.match(allDecimals) || []).length && decimals > 0) {
    value += decimal + '0'.repeat(decimals);
  } 
  //if the first one is a positive decimal
  if (value[0] === decimal) {
    value = '0' + value;
  }
  //if the first one is a negative decimal
  if (value.indexOf(`-${decimal}`) === 0) {
    value = '-0.' + value.substr(decimal.length + 1);
  }

  if (decimals > 0) {
    value += '0'.repeat(decimals - value.split(decimal)[1].length);
  }

  return value;
}

/**
 * Adds commas and decimals to the value
 */
export function prettify(value: string, separator: string, decimal: string) {
  const placeCommas = new RegExp(
    `\\B(?<!\\${separator}\\d*)(?=(\\d{3})+(?!\\d))`, 'g'
  );

  //Separate thousands
  if (separator) {
    if (value.indexOf(decimal) !== -1) {
      let [ numerator, denominator ] = value.split(decimal);
      numerator = numerator.replace(placeCommas, separator);
      value = [ numerator, denominator ].join(decimal);
    } else {
      value = value.replace(placeCommas, separator);
    }
  }

  return value
}

/**
 * Returns the actual and pretty number format
 */
export function getFormats(value: string, options: NumberOptions, cursor = 0) {
  //expand options
  const {
    min,     
    max,      
    separator = ',', 
    decimal = '.', 
    decimals = 0, 
    absolute = false
  } = options;

  const dec = decimal || '.';
  //1. Remove any non number related
  const notNumberRelated = new RegExp(`[^0-9\-\\${dec}]`, 'g');
  let formatted = value.replace(notNumberRelated, '');
  //2. Toggle negatives
  formatted = toggleNegative(formatted, absolute);
  //3. Format decimals
  formatted = fixDecimal(formatted, dec, decimals, cursor);
  //4. consider min max
  formatted = between(formatted, min, max);

  return {
    value: padDecimals(formatted, dec, decimals),
    display: prettify(formatted, separator, decimal)
  };
}

/**
 * Returns the suggested formats based on the input
 */
export function getFormatsFromInput(input: HTMLInputElement, options: NumberOptions) {
  const cursor = input.selectionStart? input.selectionStart - 1: 0;
  return getFormats(input.value, options, cursor);
}