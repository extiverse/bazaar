import { extend } from 'flarum/extend';
import app from 'flarum/app';
import BazaarSettingsModal from 'flagrow/bazaar/modals/BazaarSettingsModal';
import Extension from 'flagrow/bazaar/models/Extension';
import addBazaarPage from 'flagrow/bazaar/addBazaarPage';

app.initializers.add('flagrow-bazaar', app => {
    app.extensionSettings['flagrow-bazaar'] = () => app.modal.show(new BazaarSettingsModal());
    app.store.models['bazaar-extensions'] = Extension

    addBazaarPage();
});
