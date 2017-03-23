import Component from 'flarum/Component';
import ExtensionRepository from 'flagrow/bazaar/utils/ExtensionRepository';
import ExtensionListItem from 'flagrow/bazaar/components/ExtensionListItem';
import BazaarLoader from 'flagrow/bazaar/components/BazaarLoader';
import Button from "flarum/components/Button";

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
                <div className="ExtensionsPage-header">
                    <div className="container">
                        {Button.component({
                            className: 'Button Button--primary',
                            icon: 'plug',
                            children: app.translator.trans('flagrow-bazaar.admin.page.button.connect'),
                            onclick: () => this.connect()
                        })}
                        <p>
                            {app.translator.trans('flagrow-bazaar.admin.page.button.connectDescription')}
                        </p>
                    </div>
                </div>

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

    connect() {
        var popup = window.open();

        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/bazaar/connect'
        }).then(response => {
            if (response && response.redirect) {
                popup.location = response.redirect;
            } else {
                popup.close()
            }
        });
    }
}
