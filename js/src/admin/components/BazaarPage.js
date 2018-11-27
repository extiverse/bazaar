import Component from "flarum/Component";
import ExtensionRepository from "../utils/ExtensionRepository";
import ExtensionList from "./ExtensionList";
import ExtensionSearch from "./ExtensionSearch";
import BazaarPageHeader from './BazaarPageHeader';

export default class BazaarPage extends Component {
    init() {
        app.current = this;

        this.authorized = (app.data.settings['flagrow.bazaar.api_token'] || '').length > 0;
        this.connected = app.data.settings['flagrow.bazaar.connected'] && app.data.settings['flagrow.bazaar.connected'] !== '0';
        this.loading = m.prop(true);

        this.params = this.params();

        this.repository = new ExtensionRepository(this.loading);

        this.extensionList = new ExtensionList({
            params: this.params,
            loading: this.loading,
            repository: this.repository,
            connected: this.connected,
            authorized: this.authorized
        });

        this.search = ExtensionSearch.component({params: this.params, onsubmit: this.updateResults.bind(this)});
    }

    updateResults(params) {
        this.params = params;

        this.extensionList.update(params);
    }

    view() {
        return m('div', {className: 'Bazaar Extensions'}, [
            BazaarPageHeader.component({
                connected: this.connected
            }),
            m('div', {className: 'ExtensionsPage-list'}, [
                m('div', {className: 'container'}, [
                    this.search,
                    this.extensionList.render()
                ])
            ]),
        ]);
    }

    /**
     * Get URL parameters that stick between filter changes.
     *
     * @return {Object}
     */
    stickyParams() {
        return {
            sort: m.route.param('sort'),
            q: m.route.param('q')
        };
    }


    /**
     * Get parameters to pass to the DiscussionList component.
     *
     * @return {Object}
     */
    params() {
        const params = this.stickyParams();

        params.filter = m.route.param('filter');

        return params;
    }
}
