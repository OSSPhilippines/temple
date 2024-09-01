export type scalar = string | number | boolean | null | undefined;
export const _ = function(phrase: string, ...variables: scalar[]) {
  let translation = translate(phrase);
  for (let i = 0; i < variables.length; i++) {
    translation = translation.replace('%s', String(variables[i]));
  }
  return translation;
};

export const translate = function(phrase: string) {
  //TODO: map phrase to translation phrase
  return phrase;
};