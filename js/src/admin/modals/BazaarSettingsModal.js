import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

export default class BazaarSettingsModal extends SettingsModal {

  title() {
    return app.translator.trans('bazaar.admin.modal.settings.title');
  }

  form() {
    return [
      m('div', { className: 'Form-group' }, [
        m('label', { for: 'use-cron' }, app.translator.trans('bazaar.admin.modal.settings.field.use_cron_for_tasks.label')),
        Switch.component({
          state: this.setting('flagrow.bazaar.use_cron_for_tasks')(),
          onchange: this.setting('flagrow.bazaar.use_cron_for_tasks'),
          children: app.translator.trans('bazaar.admin.modal.settings.field.use_cron_for_tasks.toggle')
        }),
        m('span', app.translator.trans('bazaar.admin.modal.settings.field.use_cron_for_tasks.description', {
          a: <a href="https://github.com/flagrow/bazaar/wiki/Cron-task-processing" target="_blank"/>
        }))
      ]),
      m('div', { className: 'Form-group' }, [
        m('label', { for: 'bazaar-api-token' }, app.translator.trans('bazaar.admin.modal.settings.field.token.label')),
        m('input', {
          id: 'bazaar-api-token',
          className: 'FormControl',
          bidi: this.setting('flagrow.bazaar.api_token')
        }),
        m('span', app.translator.trans('bazaar.admin.modal.settings.field.token.description'))
      ])
    ];
  }
}
