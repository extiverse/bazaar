import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

export default class BazaarSettingsModal extends SettingsModal {

  title() {
    return app.translator.trans('flagrow-bazaar.admin.modal.settings.title');
  }

  form() {
    return [
      m('div', { className: 'Form-group' }, [
        m('label', { for: 'use-cron' }, app.translator.trans('flagrow-bazaar.admin.modal.settings.field.useCron')),
        Switch.component({
          state: this.setting('flagrow.bazaar.use_cron')(),
          onchange: this.setting('flagrow.bazaar.use_cron'),
          children: app.translator.trans('flagrow-bazaar.admin.modal.settings.field.useCronToggle')
        }),
        m('span', app.translator.trans('flagrow-bazaar.admin.modal.settings.field.useCronDescription'))
      ]),
      m('div', { className: 'Form-group' }, [
        m('label', { for: 'bazaar-api-token' }, app.translator.trans('flagrow-bazaar.admin.modal.settings.field.apiToken')),
        m('input', {
          id: 'bazaar-api-token',
          className: 'FormControl',
          bidi: this.setting('flagrow.bazaar.api_token')
        }),
        m('span', app.translator.trans('flagrow-bazaar.admin.modal.settings.field.apiTokenDescription'))
      ])
    ];
  }
}
