import type StyleSet from '@ossph/temple/dist/style/StyleSet';

export default function display(
  props: Record<string, any>,
  styles: StyleSet,
  initial: string|false = false,
  selector = ':host'
) {
  const { 
    flex, none, inline, block, 
    'inline-block': iblock, 'inline-flex': iflex
  } = props;
  const style = flex ? 'flex'
    : none ? 'none'
    : block ? 'block'
    : inline ? 'inline'
    : iflex ? 'inline-flex'
    : iblock ? 'inline-block'
    : initial;
  if (style) {
    styles.add(selector, 'display', style);
  }
  return style || 'initial';
}