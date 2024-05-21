import TempleComponent from './TempleComponent';

export default function props<T = Record<string, any>>() {
  if (TempleComponent.current) {
    return TempleComponent.current.props as T;
  }
  return {};
}