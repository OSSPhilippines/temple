import Styleset from '../StyleSet';
import { stylemap } from '../helpers';

export function theme(sheet: string, brand: string) {
  const directive = `@${brand} theme;`;
  if (!sheet.includes(directive)) {
    return sheet;
  }
  const styleset = new Styleset();
  styleset.set(':root', stylemap()
    .add('--black', '#000000')
    .add('--white', '#FFFFFF')
    .add('--info', '#1474FC')
    .add('--error', '#DC3545')
    .add('--warning', '#FF7B07')
    .add('--success', '#28A745')
    .add('--muted', '#999999')
  ).set('.light', stylemap()
    .add('--bg-0', '#EFEFEF')
    .add('--bg-1', '#CFCFCF')
    .add('--bg-2', '#AFAFAF')
    .add('--bg-3', '#8F8F8F')
    .add('--bg-4', '#6F6F6F')
    .add('--bd-0', '#EFEFEF')
    .add('--bd-1', '#CFCFCF')
    .add('--bd-2', '#AFAFAF')
    .add('--bd-3', '#8F8F8F')
    .add('--bd-4', '#6F6F6F')
    .add('--bg-inverse', '#242424')
    .add('--tx-0', '#000000')
    .add('--tx-1', '#242424')
    .add('--tx-inverse', '#CFCFCF')
  ).set('.dark', stylemap()
    .add('--bg-0', '#121212')
    .add('--bg-1', '#222222')
    .add('--bg-2', '#323232')
    .add('--bg-3', '#424242')
    .add('--bg-4', '#525252')
    .add('--bd-0', '#121212')
    .add('--bd-1', '#222222')
    .add('--bd-2', '#323232')
    .add('--bd-3', '#424242')
    .add('--bd-4', '#525252')
    .add('--bg-inverse', '#DBDBDB')
    .add('--tx-0', '#FFFFFF')
    .add('--tx-1', '#CFCFCF')
    .add('--tx-inverse', '#222222')
  );
  return sheet.replaceAll(directive, styleset.toString());
};