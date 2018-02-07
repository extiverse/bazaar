import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import ExtensionListItem from './ExtensionListItem';
import BazaarLoader from "./BazaarLoader";

export default class ExtensionList extends Component {
    init() {
        /**
         * Whether or not discussion results are loading.
         *
         * @type {Boolean}
         */
        this.loading = this.props.loading();

        /**
         * Whether or not there are more results that can be loaded.
         *
         * @type {Boolean}
         */
        this.moreResults = false;

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

        if (this.loading) {
            loading = BazaarLoader.component({loading: this.props.loading});
        } else if (this.moreResults) {
            loading = Button.component({
                children: app.translator.trans('core.forum.discussion_list.load_more_button'),
                className: 'Button',
                onclick: this.loadMore.bind(this)
            });
        }

        if (this.extensions.length === 0 && !this.loading) {
            const text = app.translator.trans('core.forum.discussion_list.empty_text');
            return (
                <div className="DiscussionList">
                    {Placeholder.component({text})}
                </div>
            );
        }

        return (
            <div className="ExtensionList-wrapper">
                <ul className="ExtensionList">
                    {this.extensions.map(extension => {
                        return ExtensionListItem.component({
                                extension: extension,
                                repository: this.props.repository,
                                connected: this.props.connected,
                                key: extension.package(),
                            });
                    })}
                </ul>
                <div className="ExtensionList-loadMore">
                    {loading}
                </div>
            </div>
        );
    }

    /**
     * Clear and reload the discussion list.
     *
     * @public
     */
    refresh(clear = true) {
        if (clear) {
            this.loading = true;
            this.extensions = [];
        }

        return this.loadResults().then(
            results => {
                this.extensions = [];
                this.parseResults(results);
            },
            () => {
                this.loading = false;
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

        return app.store.find('bazaar/extensions', params);
    }

    /**
     * Parse results and append them to the discussion list.
     *
     * @param {Extension[]} results
     * @return {Extension[]}
     */
    parseResults(results) {
        [].push.apply(this.extensions, results);

        this.loading = false;
        this.moreResults = !!results.payload.links.next;

        m.lazyRedraw();

        return results;
    }

    /**
     * Load the next page of discussion results.
     *
     * @public
     */
    loadMore() {
        this.loading = true;

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
        const params = this.props.params();
        const out = {include: [], filter: {}};

        out.sort = this.sortMap()[params.sort];

        if (params.q) {
            out.filter.q = params.q;
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
