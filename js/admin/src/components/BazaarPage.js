import Component from "flarum/Component";
import ExtensionRepository from "flagrow/bazaar/utils/ExtensionRepository";
import ExtensionListItem from "flagrow/bazaar/components/ExtensionListItem";
import BazaarLoader from "flagrow/bazaar/components/BazaarLoader";
import Button from "flarum/components/Button";

export default class BazaarPage extends Component {
    init() {
        this.loading = m.prop(false);
        this.repository = m.prop(new ExtensionRepository(this.loading));
        this.repository().loadNextPage();
        this.connected = app.forum.attribute('flagrow.bazaar.connected') || 0;
    }

    view() {
        return m('div', {className: 'ExtensionsPage Bazaar'}, [
            m('div', {className: 'ExtensionsPage-header'}, [
                m('div', {className: 'container'}, [
                    this.connected ?
                        Button.component({
                            className: 'Button Button--primary',
                            icon: 'dashboard',
                            children: app.translator.trans('flagrow-bazaar.admin.page.button.connected'),
                            onclick: () => window.open('https://flagrow.io/home')
                        }) :
                        Button.component({
                            className: 'Button Button--primary',
                            icon: 'plug',
                            children: app.translator.trans('flagrow-bazaar.admin.page.button.connect'),
                            onclick: () => this.connect()
                        }),
                    m('p', [
                        app.translator.trans('flagrow-bazaar.admin.page.button.connectDescription')
                    ])
                ])
            ]),
            m('div', {className: 'ExtensionsPage-list'}, [
                m('div', {className: 'container'}, this.items())
            ]),
            BazaarLoader.component({loading: this.loading})
        ]);
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
