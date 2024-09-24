import type StyleSet from '@ossph/temple/dist/style/StyleSet';

export default function padding(
  props: Record<string, any>,
  styles: StyleSet,
  selector = ':host'
) {
  const { 
    padding, 
    'padding-x': paddingX, 
    'padding-y': paddingY
  } = props;
  
  let set = false;
  if (!isNaN(parseInt(padding))) {
    styles.add(selector, 'padding', `${padding}px`);
    set = true;
  }
  if (!isNaN(parseInt(paddingX))) {
    styles.add(selector, 'padding-left', `${paddingX}px`);
    styles.add(selector, 'padding-right', `${paddingX}px`);
    set = true;
  }
  if (!isNaN(parseInt(paddingY))) {
    styles.add(selector, 'padding-top', `${paddingY}px`);
    styles.add(selector, 'padding-bottom', `${paddingY}px`);
    set = true;
  }

  return set;
}