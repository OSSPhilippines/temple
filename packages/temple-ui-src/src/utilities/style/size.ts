import type StyleSet from '@ossph/temple/dist/style/StyleSet';

export default function size(
  props: Record<string, any>,
  styles: StyleSet, 
  initial: string|false = false, 
  selector = ':host',
  property = 'font-size'
) {
  const { 
    size, xs,  sm,  md,  lg, 
    xl,   xl2, xl3, xl4, xl5
  } = props;
  const style = size ? `${size}px` 
    : xs ? '8px'   : sm ? '12px' 
    : md ? '16px'  : lg ? '20px' 
    : xl ? '24px'  : xl2 ? '28px' 
    : xl3 ? '32px' : xl4 ? '36px' 
    : xl5 ? '40px' : initial;
  if (style) {
    styles.add(selector, property, style);
  }
  
  return size ? 'size'
    : xs ? 'xs'   : sm ? 'sm' 
    : md ? 'md'   : lg ? 'lg' 
    : xl ? 'xl'   : xl2 ? 'xl2' 
    : xl3 ? 'xl3' : xl4 ? 'xl4' 
    : xl5 ? 'xl5' : 'initial';
}