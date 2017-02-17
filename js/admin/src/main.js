import { extend } from 'flarum/extend';
import app from 'flarum/app';

import BazaarSettingsModal from 'flagrow/bazaar/components/BazaarSettingsModal';

app.initializers.add('flagrow-bazaar', app => {
    app.extensionSettings['flagrow-bazaar'] = () => app.modal.show(new BazaarSettingsModal());
});
