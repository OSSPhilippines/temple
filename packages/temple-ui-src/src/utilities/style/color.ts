import type StyleSet from '@ossph/temple/dist/style/StyleSet';

export default function color(
  props: Record<string, any>,
  styles: StyleSet, 
  initial: string|false = false,
  selector = ':host',
  property = 'color'
) {
  const { 
    color, white,   black, 
    info,  warning, success, 
    error, muted,   primary, 
    secondary, theme
  } = props;
  const style = color ? color 
    : theme ? `var(--${theme})`
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