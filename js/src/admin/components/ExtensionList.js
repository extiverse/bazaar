import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import ExtensionListItem from './ExtensionListItem';
import BazaarLoader from "./BazaarLoader";
import Placeholder from 'flarum/components/Placeholder';

export default class ExtensionList extends Component {
    init() {
        /**
         * Whether or not discussion results are loading.
         *
         * @type {Boolean}
         */
        this.loading = this.props.loading;

        /**
         * Whether or not there are more results that can be loaded.
         *
         * @type {Boolean}
         */
        this.moreResults = false;
        this.resultMeta = {};

        // this.repository = new ExtensionRepository(this.loading);

        /**
         * The discussions in the discussion list.
         *
         * @type {Extension[]}
         */
        this.extensions = [];

        this.refresh();
    }



    view() {
        let loading;

        if (this.loading()) {
            loading = BazaarLoader.component({loading: this.loading});
        } else if (this.moreResults) {
            loading = [
                Button.component({
                    children: app.translator.trans('bazaar.admin.page.button.more', {current: this.resultMeta.pages_current + 1, total: this.resultMeta.pages_total}),
                    className: 'Button Button--primary',
                    onclick: this.loadMore.bind(this)
                })
            ];
        }

        if (this.extensions.length === 0 && !this.loading) {
            let text = app.translator.trans('bazaar.admin.page.state.no_results_available');

            if (! this.props.authorized) {
                text = app.translator.trans('bazaar.admin.page.state.not_authorized');
            }

            return (
                <div className="DiscussionList">
                    {Placeholder.component({text})}
                </div>
            );
        }

        return (
            <div className="ExtensionList-wrapper">
                <div className="ExtensionList">
                    {this.extensions.map(extension => {
                        return ExtensionListItem.component({
                                extension: extension,
                                repository: this.props.repository,
                                connected: this.props.connected,
                                key: extension.package(),
                            });
                    })}
                </div>
                <div className="ExtensionList-loadMore">
                    {loading}
                </div>
            </div>
        );
    }

    update(params) {
        this.props.params = params;

        this.refresh();
    }

    /**
     * Clear and reload the discussion list.
     *
     * @public
     */
    refresh(clear = true) {
        if (clear) {
            this.loading(true);
            this.extensions = [];
        }

        return this.loadResults().then(
            results => {
                this.extensions = [];
                this.parseResults(results);
            },
            () => {
                this.loading(false);
                m.redraw();
            }
        );
    }

    /**
     * Load a new page of discussion results.
     *
     * @param {Integer} offset The index to start the page at.
     * @return {Promise}
     */
    loadResults(offset) {
        const params = this.requestParams();
        params.page = {offset};
        params.include = params.include.join(',');

        return app.store.find('bazaar-extensions', params);
    }

    /**
     * Parse results and append them to the discussion list.
     *
     * @param {Extension[]} results
     * @return {Extension[]}
     */
    parseResults(results) {
        [].push.apply(this.extensions, results);

        this.loading(false);
        this.moreResults = !!results.payload.links.next;
        this.resultMeta = results.payload.meta || {};

        m.lazyRedraw();

        return results;
    }

    /**
     * Load the next page of discussion results.
     *
     * @public
     */
    loadMore() {
        this.loading(true);

        this.loadResults(this.extensions.length)
            .then(this.parseResults.bind(this));
    }

    /**
     * Get the parameters that should be passed in the API request to get
     * discussion results.
     *
     * @return {Object}
     * @api
     */
    requestParams() {
        const params = this.props.params;
        const out = {include: [], filter: {}};

        out.sort = this.sortMap()[params.sort];

        if (params.q) {
            out.filter.q = params.q;
        }

        if (params.filter) {
            out.filter = window.$.param(params.filter);
        }

        return out;
    }

    /**
     * Get a map of sort keys (which appear in the URL, and are used for
     * translation) to the API sort value that they represent.
     *
     * @return {Object}
     */
    sortMap() {
        const map = {};

        if (this.props.params.q) {
            map.relevance = '';
        }

        return map;
    }
}
