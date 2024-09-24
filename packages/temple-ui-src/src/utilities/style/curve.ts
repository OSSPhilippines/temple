import type StyleSet from '@ossph/temple/dist/style/StyleSet';

export default function curve(
  props: Record<string, any>,
  styles: StyleSet, 
  initial: string|false = false, 
  selector = ':host'
) {
  const { 
    curve, curved,  rounded,  pill
  } = props;
  const style = curve ? `${curve}px` 
    : curved ? '4px'
    : rounded ? '12px'
    : pill ? '10000px'
    : initial;
  if (style) {
    styles.add(selector, 'border-radius', style);
    styles.add(selector, 'overflow', 'hidden');
  }
  return curve ? 'curve'
    : curved ? 'curved'
    : rounded ? 'rounded'
    : pill ? 'pill'
    : 'initial';
}