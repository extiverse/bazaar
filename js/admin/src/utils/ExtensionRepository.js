import app from "flarum/app";
import debounce from 'flagrow/bazaar/utils/debounce';
import popupPromise from 'flagrow/bazaar/utils/popupPromise';

export default class ExtensionRepository {
    constructor(loading) {
        this.extensions = m.prop([]);
        this.nextPageUrl = null;
        this.loading = loading;
        this.resetNavigation();

        this.filters = {
            installed: null,
            pending: null,
            update_required: null,
            favorited: null,
            is_premium: null,
            subscribed: null,
            languages: null,
            search: '',
        };

        // Code to run once after a serie of filterBy() calls
        // Must be done in constructor to save a single reference to the output of debounce
        this.filterByDebounce = debounce(() => {
            this.resetNavigation();
            this.loadNextPage();
        }, 500);
    }

    /**
     * Change the value of a filter
     * @param {string} filter
     * @param {string} filterBy
     */
    filterBy(filter, filterBy) {
        this.filters[filter] = filterBy;

        this.filterByDebounce();
    }

    /**
     * Get the value of a filter
     * @param {string} filter
     * @returns {string}
     */
    filteredBy(filter) {
        return this.filters[filter];
    }

    /**
     * Handles a request error
     */
    requestError() {
        // If an error occured, we can clear the loading overlay
        // The error means it's not processing anymore
        this.loading('error');

        // Depending on how fast the "Oops! Something went wrong" popup appears,
        // the loading change is not taken into account. Use redraw to force remove the overlay
        m.redraw();
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
            url: this.nextPageUrl,
            data: {
                filter: this.filters,
            },
        }).then(result => {
            const newExtensions = result.data.map(data => app.store.createRecord('bazaar-extensions', data));
            this.extensions(newExtensions);
            this.nextPageUrl = result.links.next;
            this.loading(false);

            m.redraw();
        }).catch(() => this.requestError());
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
            timeout: 0,
            data: {
                id: extension.id()
            }
        }).then(response => {
            this.updateExtensionInRepository(response)
        }).catch(() => this.requestError());
    }

    /**
     * Handles an installation failure.
     * @param extension
     */
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
            timeout: 0,
            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id()
        }).then(response => {
            this.updateExtensionInRepository(response)
        }).catch(() => this.requestError());
    }

    /**
     * Handles an uninstall failure.
     * @param extension
     */
    uninstallFailure(extension) {
        this.resetNavigation();
        this.loadNextPage();
    }

    /**
     * Processing (de-) favoriting extensions.
     * @param extension
     */
    favoriteExtension(extension) {
        this.loading(true);

        app.request({
            method: 'post',
            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id() + '/favorite',
            data: {
                favorite: extension.favorited() != true
            }
        }).then(response => {
            this.updateExtensionInRepository(response)
        }).catch(() => this.requestError());
    }

    premiumExtensionSubscribe(extension, buy = true) {
        //this.loading(true);

        const popup = popupPromise({
            url: app.forum.attribute('apiUrl') + '/bazaar/redirect/' + (buy ? '' : 'un') + 'subscribe/' + extension.id(),
            waitForUrl: app.forum.attribute('apiUrl') + '/bazaar/callback/subscription',
        });

        popup.then(() => {
            window.location.reload();
        }).catch(() => {
            alert(app.translator.trans('flagrow-bazaar.admin.page.extension.subscribe_check_failed'));
        });
    }

    premiumExtensionUnsubscribe(extension) {
        this.premiumExtensionSubscribe(extension, false);
    }

    /**
     * Updates an extension.
     * @param extension
     */
    updateExtension(extension) {
        this.loading(true);

        app.request({
            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id(),
            timeout: 0,
            method: 'PATCH'
        }).then(response => {
            this.updateExtensionInRepository(response)
        }).then(() => {
            location.reload();
        }).catch(() => this.requestError());
    }

    /**
     * Toggles an extension (enable or disable).
     * @param extension
     */
    toggleExtension(extension) {
        this.loading(true);

        const enabled = extension.enabled();

        app.request({
            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id() + '/toggle',
            method: 'PATCH',
            data: {enabled: !enabled}
        }).then(response => {
            this.updateExtensionInRepository(response)
        }).catch(() => this.requestError());
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
    updateExtensionInRepository(response) {
        this.loading(false);

        let extension = app.store.createRecord('bazaar-extensions', response.data);
        this.extensions()[this.getExtensionIndex(extension)] = extension;
        m.redraw();
    }
}
