import app from 'flarum/app';

export default class ExtensionRepository {
    constructor(loading) {
        this.extensions = m.prop([]);
        this.nextPageUrl = null;
        this.loading = loading;
        this.resetNavigation();
    }

    /**
     * Loads next page or resets based on nextPageUrl.
     */
    loadNextPage() {
        if (this.loading() || !this.nextPageUrl) {
            return;
        }

        this.loading(true);

        app.request({
            method: 'GET',
            url: this.nextPageUrl
        }).then(result => {
            const newExtensions = result.data.map(data => app.store.createRecord('bazaar-extensions', data));
            // start/end computation is required for the admin UI to refresh after the new extensions have been loaded
            // this.extensions(this.extensions().concat(newExtensions));
            this.extensions(newExtensions);
            this.nextPageUrl = result.links.next;
            this.loading(false);

            m.redraw();
        });
    }

    /**
     * Resets the navigation to start all over.
     */
    resetNavigation() {
        this.loading(false); // Might cause problems if an update is in process
        this.nextPageUrl = app.forum.attribute('apiUrl') + '/bazaar/extensions';
        this.extensions([]);
    }

    /**
     * Install an extension.
     * @param extension
     */
    installExtension(extension) {
        this.loading(true);

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/bazaar/extensions',
            data: {
                id: extension.id()
            }
        }).then(
            this.updateExtension.bind(this, extension, 'installed', true),
            this.installFailure.bind(this, extension)
        );
    }

    installFailure(extension) {
        this.resetNavigation();
        this.loadNextPage();
    }

    /**
     * Uninstall an extension.
     * @param extension
     */
    uninstallExtension(extension) {
        this.loading(true);

        app.request({
            method: 'DELETE',
            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id()
        }).then(
            this.updateExtension.bind(this, extension, 'installed', false),
            this.uninstallFailure.bind(this, extension)
        );
    }

    uninstallFailure(extension) {
        this.resetNavigation();
        this.loadNextPage();
    }

    /**
     * Togges an extension (enable or disable).
     * @param extension
     */
    toggleExtension(extension) {
        this.loading(true);

        const enabled = extension.enabled();

        app.request({
            url: app.forum.attribute('apiUrl') + '/extensions/' + extension.flarum_id(),
            method: 'PATCH',
            data: {enabled: !enabled}
        }).then(() => {
            this.updateExtension(extension, 'enabled', !enabled);
        });
    }

    /**
     * Disable an extension.
     * @param extension
     */
    disableExtension(extension) {
        this.toggleExtension(extension);
    }

    /**
     * Enable an extension.
     * @param extension
     */
    enableExtension(extension) {
        this.toggleExtension(extension);
    }

    /**
     * Loads the index of this extension in the extensions array.
     * @param extension
     * @returns {number}
     */
    getExtensionIndex(extension) {
        return this.extensions().findIndex(ext => ext.id() == extension.id());
    }

    /**
     * Updates an extension and takes care of updating its state in the extension page too.
     * @param extension
     * @param property
     * @param value
     */
    updateExtension(extension, property, value) {
        this.extensions()[this.getExtensionIndex(extension)][property](value);
        this.resetNavigation();
        this.loadNextPage();
    }
}
