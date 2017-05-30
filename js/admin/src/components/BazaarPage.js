import Component from 'flarum/Component';
import ExtensionRepository from 'flagrow/bazaar/utils/ExtensionRepository';
import ExtensionListItem from 'flagrow/bazaar/components/ExtensionListItem';
import BazaarLoader from 'flagrow/bazaar/components/BazaarLoader';
import BazaarPageHeader from 'flagrow/bazaar/components/BazaarPageHeader';

export default class BazaarPage extends Component {
    init() {
        app.current = this;

        this.loading = m.prop(false);
        this.repository = m.prop(new ExtensionRepository(this.loading));
        this.repository().loadNextPage();
        this.connected = app.data.settings['flagrow.bazaar.connected'] == 1 || false;
    }

    view() {
        return m('div', {className: 'ExtensionsPage Bazaar'}, [
            BazaarPageHeader.component({
                connected: this.connected
            }),
            m('div', {className: 'ExtensionsPage-list'}, [
                m('div', {className: 'container'}, this.items())
            ]),
            BazaarLoader.component({loading: this.loading})
        ]);
    }

    items() {
        return m('ul', {className: 'ExtensionList'}, [
            this.repository().extensions().map(
                extension => ExtensionListItem.component({
                    extension: extension,
                    repository: this.repository,
                    connected: this.connected
                })
            )
        ]);
    }
}
