import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';

export default class BazaarSettingsModal extends SettingsModal {

    title() {
        return app.translator.trans('flagrow-bazaar.admin.popup.title');
    }

    form() {
        return [
            m('div', {className: 'Form-group'}, [
                m('label', {for: 'bazaar-api-token'}, app.translator.trans('flagrow-bazaar.admin.popup.field.apiToken')),
                m('input', {
                    id: 'bazaar-api-token',
                    className: 'FormControl',
                    bidi: this.setting('flagrow.bazaar.api_token'),
                    disabled: this.setting('flagrow.bazaar.api_token')().length > 0
                }),
                m('span', app.translator.trans('flagrow-bazaar.admin.popup.field.apiTokenDescription'))
            ])
        ];
    }
}
