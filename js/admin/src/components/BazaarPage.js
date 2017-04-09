import Component from 'flarum/Component';
import ExtensionRepository from 'flagrow/bazaar/utils/ExtensionRepository';
import ExtensionListItem from 'flagrow/bazaar/components/ExtensionListItem';
import BazaarLoader from 'flagrow/bazaar/components/BazaarLoader';
import BazaarPageHeader from 'flagrow/bazaar/components/BazaarPageHeader';

export default class BazaarPage extends Component {
    init() {
        this.loading = m.prop(false);
        this.repository = m.prop(new ExtensionRepository(this.loading));
        this.repository().loadNextPage();
        this.loader = BazaarLoader.component({loading: this.loading});
    }

    view() {
        return (
            <div className="ExtensionsPage Bazaar">
                {BazaarPageHeader.component()}

                <div className="ExtensionsPage-list">
                    <div className="container">
                        {this.items()}
                    </div>
                </div>
                {this.loader}
            </div>
        );
    }

    items() {
        return m('ul', {className: 'ExtensionList'}, [
            this.repository().extensions().map(
                extension => ExtensionListItem.component({extension: extension, repository: this.repository})
            )
        ]);
    }
}
