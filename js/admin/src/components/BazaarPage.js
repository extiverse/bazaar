import Component from "flarum/Component";
import ExtensionRepository from "./../utils/ExtensionRepository";
import ExtensionListItem from "./ExtensionListItem";
import BazaarLoader from "./BazaarLoader";
import BazaarPageHeader from './BazaarPageHeader';
import CustomCheckbox from "./CustomCheckbox";

export default class BazaarPage extends Component {
    init() {
        app.current = this;

        this.loading = m.prop(false);
        this.repository = m.prop(new ExtensionRepository(this.loading));
        this.repository().loadNextPage();
        this.connected = app.data.settings['flagrow.bazaar.connected'] && app.data.settings['flagrow.bazaar.connected'] !== '0';
    }

    view() {
        return m('div', {className: 'ExtensionsPage Bazaar'}, [
            BazaarPageHeader.component({
                connected: this.connected
            }),
            m('div', {className: 'ExtensionsPage-list'}, [
                m('div', {className: 'container'}, [
                    this.search(),
                    this.items()
                ])
            ]),
            BazaarLoader.component({loading: this.loading})
        ]);
    }

    search() {
        return m('div', [
            m('fieldset', {className: 'ExtensionSearch'},
                m('input[type=text].FormControl', {
                    value: this.repository().filteredBy('search'),
                    oninput: m.withAttr('value', term => {
                        this.repository().filterBy('search', term);
                    }),
                    placeholder: app.translator.trans('flagrow-bazaar.admin.search.placeholder'),
                })
            ),
            m('div', {className: 'ExtensionFilters ButtonGroup'}, [
                CustomCheckbox.component({
                    icon: 'toggle-up',
                    className: 'Button hasIcon',
                    state: this.repository().filteredBy('update_required'),
                    onchange: (checked) => this.repository().filterBy('update_required', checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_update_required')
                }),
                CustomCheckbox.component({
                    icon: 'circle-o-notch',
                    className: 'Button hasIcon',
                    state: this.repository().filteredBy('pending'),
                    onchange: (checked) => this.repository().filterBy('pending', checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_pending')
                }),
                CustomCheckbox.component({
                    icon: 'plus-square',
                    className: 'Button hasIcon',
                    state: this.repository().filteredBy('installed'),
                    onchange: (checked) => this.repository().filterBy('installed', checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_installed')
                }),
                CustomCheckbox.component({
                    icon: 'inr',
                    className: 'Button hasIcon',
                    state: this.repository().filteredBy('languages'),
                    onchange: (checked) => this.repository().filterBy('languages', checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_languages')
                }),
                this.connected ? [
                    CustomCheckbox.component({
                        icon: 'heart',
                        className: 'Button hasIcon',
                        state: this.repository().filteredBy('favorited'),
                        onchange: (checked) => this.repository().filterBy('favorited', checked),
                        children: app.translator.trans('flagrow-bazaar.admin.search.filter_favorited')
                    }),
                    CustomCheckbox.component({
                        icon: 'shopping-cart',
                        className: 'Button hasIcon',
                        state: this.repository().filteredBy('subscribed'),
                        onchange: (checked) => this.repository().filterBy('subscribed', checked),
                        children: app.translator.trans('flagrow-bazaar.admin.search.filter_subscribed')
                    }),
                ] : '',
                CustomCheckbox.component({
                    icon: 'certificate',
                    className: 'Button hasIcon',
                    state: this.repository().filteredBy('is_premium'),
                    onchange: (checked) => this.repository().filterBy('is_premium', checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_premium')
                }),
            ])
        ])
    }

    items() {
        return m('ul', {className: 'ExtensionList'}, [
            this.repository().extensions().map(
                extension => ExtensionListItem.component({
                    extension: extension,
                    repository: this.repository,
                    connected: this.connected,
                    key: extension.package(),
                })
            )
        ]);
    }
}
