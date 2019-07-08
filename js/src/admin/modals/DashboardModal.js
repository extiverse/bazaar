import Switch from 'flarum/components/Switch';
import SettingsModal from 'flarum/components/SettingsModal';
import saveSettings from 'flarum/utils/saveSettings';
import Button from 'flarum/components/Button';

export default class DashboardModal extends SettingsModal {
  title() {
    return app.translator.trans('bazaar.admin.modal.dashboard.title');
  }

  form() {
    const flagrowHost = this.props.flagrowHost;
    const syncing = this.setting('flagrow.bazaar.sync', false);

    return m('div', { className: 'Modal-body' }, [
        m('p', app.translator.trans('bazaar.admin.modal.dashboard.sync.description', { host: flagrowHost })),
        Switch.component({
          state: (syncing() === true || syncing() == 1),
          onchange: this.updateSetting.bind(this, syncing, 'flagrow.bazaar.sync'),
          children: app.translator.trans('bazaar.admin.modal.dashboard.sync.switch', { host: flagrowHost })
        }),
      ]
    );
  }

  submitButton() {
    const flagrowHost = this.props.flagrowHost;
    return m('div', {className: 'ButtonGroup'}, [
      Button.component({
        className: 'Button Connected',
        icon: 'dashboard',
        children: app.translator.trans('bazaar.admin.modal.dashboard.visit-remote-dashboard'),
        onclick: () => window.open(flagrowHost + '/home')
      })
    ]);
  }

  /**
   * Updates setting in database.
   * @param prop
   * @param setting
   * @param value
   */
  updateSetting(prop, setting, value) {
    saveSettings({
      [setting]: value
    });

    prop(value);
  }
}
