import type StyleSet from '@ossph/temple/dist/style/StyleSet';

export default function align(
  props: Record<string, any>,
  styles: StyleSet,
  initial: string|false = false,
  selector = ':host'
) {
  const { align } = props;
  
  if (align) {
    styles.add(selector, 'text-align', align);
  } else if (initial) {
    styles.add(selector, 'text-align', initial);
  }

  return align || 'initial';
}