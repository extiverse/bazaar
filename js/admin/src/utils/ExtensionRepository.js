import app from 'flarum/app';

export default class ExtensionRepository {
    constructor() {
        this.extensions = m.prop([]);
        this.nextPageUrl = null;
        this.loading = false;
        this.resetNavigation();
    }
    loadNextPage() {
        if (this.loading || !this.nextPageUrl) {
            return;
        }

        this.loading = true;
        app.request({
            method: 'GET',
            url: this.nextPageUrl
        }).then(result => {
            console.log(result);
            const newExtensions = result.data.map(data => app.store.createRecord('bazaar-extensions', data));
            // start/end computation is required for the admin UI to refresh after the new extensions have been loaded
            m.startComputation();
            this.extensions(this.extensions().concat(newExtensions));
            m.endComputation();
            console.log(newExtensions);

            this.nextPageUrl = result.links.next;
            this.loading = false;
        });
    }
    resetNavigation() {
        this.loading = false; // Might cause problems if an update is in process
        this.nextPageUrl = app.forum.attribute('apiUrl') + '/bazaar/extensions';
        this.extensions([]);
    }
    installExtension(extension) {
        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/bazaar/extensions',
            data: {
                id: extension.id()
            }
        }).then(() => {
            m.startComputation();
            this.resetNavigation();
            m.endComputation();
        });
    }
    uninstallExtension(extension) {
        app.request({
            method: 'DELETE',
            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/:id',
            data: {
                id: extension.id()
            }
        }).then(() => {
            m.startComputation();
            this.resetNavigation();
            m.endComputation();
        });
    }
}
