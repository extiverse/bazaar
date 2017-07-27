import Component from "flarum/Component";
import ExtensionRepository from "flagrow/bazaar/utils/ExtensionRepository";
import ExtensionListItem from "flagrow/bazaar/components/ExtensionListItem";
import BazaarLoader from "flagrow/bazaar/components/BazaarLoader";
import BazaarPageHeader from 'flagrow/bazaar/components/BazaarPageHeader';
import CustomCheckbox from "flagrow/bazaar/components/CustomCheckbox";

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
        return m('fieldset.ExtensionSearch', [
            m('input[type=text].FormControl', {
                value: this.repository().searchTerm(),
                onchange: m.withAttr('value', term => {
                    this.repository().search(term);
                }),
                placeholder: app.translator.trans('flagrow-bazaar.admin.search.placeholder')
            }),
            CustomCheckbox.component({
                iconChecked: 'toggle-up',
                state: this.repository().filterUpdateRequired(),
                onchange: (checked) => this.repository().filterUpdateRequired(checked),
                children: app.translator.trans('flagrow-bazaar.admin.search.filter_update_required')
            }),
            CustomCheckbox.component({
                iconChecked: 'plus-square',
                state: this.repository().filterInstalled(),
                onchange: (checked) => this.repository().filterInstalled(checked),
                children: app.translator.trans('flagrow-bazaar.admin.search.filter_installed')
            }),
            this.connected ? CustomCheckbox.component({
                iconChecked: 'heart',
                state: this.repository().filterFavorited(),
                onchange: (checked) => this.repository().filterFavorited(checked),
                children: app.translator.trans('flagrow-bazaar.admin.search.filter_favorites')
            }) : ''
        ])
    }

    items() {
        return m('ul', {className: 'ExtensionList'}, [
            this.repository().extensions().filter(extension => {
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
                    connected: this.connected
                })
            )
        ]);
    }
}
