import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';

export default [
  new Extend.Admin().setting(() => ({
    setting: 'acpl-my-tags.enable-placeholder',
    label: app.translator.trans('acpl-my-tags.admin.settings.enable-placeholder'),
    type: 'boolean',
    default: false,
  })),
];
