import app from 'flarum/admin/app';

app.initializers.add('acpl/my-tags', () => {
  app.extensionData.for('acpl-my-tags').registerSetting({
    setting: 'acpl-my-tags.enable-placeholder',
    label: app.translator.trans('acpl-my-tags.admin.settings.enable-placeholder'),
    type: 'boolean',
  });
});
