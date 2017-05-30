import app from 'flarum/app';

export default class ExtensionRepository {
    constructor(loading) {
        this.tasks = m.prop([]);
        this.nextPageUrl = null;
        this.loading = loading;
        this.resetNavigation();
    }

    loadNextPage() {
        if (this.loading() || !this.nextPageUrl) {
            return;
        }

        this.loading(true);

        app.request({
            method: 'GET',
            url: this.nextPageUrl
        }).then(result => {
            const newTasks = result.data.map(data => app.store.createRecord('bazaar-tasks', data));
            this.tasks(newTasks);
            this.nextPageUrl = null;
            this.loading(false);

            m.redraw();
        });
    }

    resetNavigation() {
        this.loading(false);
        this.nextPageUrl = app.forum.attribute('apiUrl') + '/bazaar/tasks';
        this.tasks([]);
    }

}
