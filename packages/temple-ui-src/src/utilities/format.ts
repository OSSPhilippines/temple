import type StyleSet from '@ossph/temple/dist/style/StyleSet';

export function setDisplay(
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

export function setColor(
  props: Record<string, any>,
  styles: StyleSet, 
  initial: string|false = false,
  selector = ':host',
  property = 'color'
) {
  const { 
    color,   white, black, info,    warning, 
    success, error, muted, primary, secondary,
  } = props;
  const style = color ? color 
    : white ? 'var(--white)' 
    : black ? 'var(--black)' 
    : info ? 'var(--info)' 
    : warning ? 'var(--warning)' 
    : success ? 'var(--success)' 
    : error ? 'var(--error)' 
    : muted ? 'var(--muted)' 
    : primary ? 'var(--primary)' 
    : secondary ? 'var(--secondary)' 
    : initial;
  if (style) {
    styles.add(selector, property, style);
  }
  
  return color ? 'color' 
    : white ? 'white' 
    : black ? 'black'
    : info ? 'info'
    : warning ? 'warning'
    : success ? 'success'
    : error ? 'error'
    : muted ? 'muted'
    : primary ? 'primary'
    : secondary ? 'secondary'
    : 'initial';
}

export function setSize(
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

export function setCurve(
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
  }
  return curve ? 'curve'
    : curved ? 'curved'
    : rounded ? 'rounded'
    : pill ? 'pill'
    : 'initial';
}

export function setBold(
  props: Record<string, any>,
  styles: StyleSet, 
  selector = ':host'
) {
  const { bold } = props;
  
  if (bold) {
    styles.add(selector, 'font-weight', 'bold');
  }

  return bold;
}

export function setUnderline(
  props: Record<string, any>,
  styles: StyleSet, 
  selector = ':host'
) {
  const { underline } = props;
  
  if (underline) {
    styles.add(selector, 'text-decoration', 'underline');
  }

  return underline;
}