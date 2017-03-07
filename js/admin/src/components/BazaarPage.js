import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import ExtensionRepository from 'flagrow/bazaar/utils/ExtensionRepository';
import ExtensionListItem from 'flagrow/bazaar/components/ExtensionListItem';

export default class BazaarPage extends Component {
    init() {
        this.repository = m.prop(new ExtensionRepository);
        this.repository().loadNextPage();
    }

    view() {
        return (
            <div className="ExtensionsPage">
                <div className="ExtensionsPage-header">
                    <div className="container">
                    </div>
                </div>

                <div className="ExtensionsPage-list">
                    <div className="container">
                        {this.items()}
                    </div>
                </div>
            </div>
        );
    }

    items() {

        return m('ul', {className: 'ExtensionList'}, [
            this.repository().extensions().map(
                extension => ExtensionListItem.component({extension: extension, repository: this.repository})
            ),
            // m('li', Button.component({
            //     type: 'button',
            //     className: 'Button',
            //     children: app.translator.trans('flagrow-bazaar.admin.page.button.more'),
            //     onclick: () => {
            //         this.repository().loadNextPage();
            //     }
            // }))
        ]);
    }
}
