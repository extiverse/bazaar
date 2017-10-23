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
        this.connected = app.data.settings['flagrow.bazaar.connected'] == 1 || false;
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
                    state: this.repository().filterUpdateRequired(),
                    onchange: (checked) => this.repository().filterUpdateRequired(checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_update_required')
                }),
                CustomCheckbox.component({
                    icon: 'circle-o-notch',
                    className: 'Button hasIcon',
                    state: this.repository().filterPending(),
                    onchange: (checked) => this.repository().filterPending(checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_pending')
                }),
                CustomCheckbox.component({
                    icon: 'plus-square',
                    className: 'Button hasIcon',
                    state: this.repository().filterInstalled(),
                    onchange: (checked) => this.repository().filterInstalled(checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_installed')
                }),
                CustomCheckbox.component({
                    icon: 'inr',
                    className: 'Button hasIcon',
                    state: this.repository().filterLanguages(),
                    onchange: (checked) => this.repository().filterLanguages(checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_languages')
                }),
                this.connected ? CustomCheckbox.component({
                    icon: 'heart',
                    className: 'Button hasIcon',
                    state: this.repository().filterFavorited(),
                    onchange: (checked) => this.repository().filterFavorited(checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_favorited')
                }) : ''
            ])
        ])
    }

    items() {
        return m('ul', {className: 'ExtensionList'}, [
            this.repository().extensions().filter(extension => {

                if (this.repository().filterLanguages() && ! extension.locale()) {
                    return false;
                }

                if (this.repository().filterPending() && ! extension.pending()) {
                    return false;
                }

                if (this.repository().filterInstalled() && ! extension.installed()) {
                    return false;
                }

                if (this.repository().filterUpdateRequired() && ! extension.outdated()) {
                    return false;
                }

                if (this.repository().filterFavorited() && ! extension.favorited()) {
                    return false;
                }

                return true;
            }).map(
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
