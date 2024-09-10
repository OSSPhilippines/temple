import { Plugin, TempleUIOptions } from './types';
export default function templeui(options: TempleUIOptions = {}) {
  const { brand = 'tui' } = options;
  const plugins = new Set<Plugin>();
  return {
    brand,
    plugin(plugin: Plugin) {
      plugins.add(plugin);
      return this;
    },
    upgrade(sheet: string) {
      for (const plugin of plugins) {
        sheet = plugin(sheet, brand);
      }
      return sheet;
    }
  };
}