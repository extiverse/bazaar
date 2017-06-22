import Component from "flarum/Component";
import ExtensionRepository from "flagrow/bazaar/utils/ExtensionRepository";
import ExtensionListItem from "flagrow/bazaar/components/ExtensionListItem";
import BazaarLoader from "flagrow/bazaar/components/BazaarLoader";
import Button from "flarum/components/Button";
import FilePermissionsModal from 'flagrow/bazaar/modals/FilePermissionsModal';
import MemoryLimitModal from 'flagrow/bazaar/modals/MemoryLimitModal';
import BazaarConnectModal from 'flagrow/bazaar/modals/BazaarConnectModal';
import CustomCheckbox from "flagrow/bazaar/components/CustomCheckbox";

export default class BazaarPage extends Component {
    init() {
        app.current = this;

        this.loading = m.prop(false);
        this.repository = m.prop(new ExtensionRepository(this.loading));
        this.repository().loadNextPage();
        this.connected = app.data.settings['flagrow.bazaar.connected'] == 1 || false;
        this.flagrowHost = app.data.settings['flagrow.bazaar.flagrow-host'] || 'https://flagrow.io';
    }

    view() {
        return m('div', {className: 'ExtensionsPage Bazaar'}, [
            m('div', {className: 'ExtensionsPage-header'}, [
                m('div', {className: 'container'}, this.header())
            ]),
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
            // m('input[type=text].FormControl', {
            //     value: this.repository().searchTerm(),
            //     onchange: m.withAttr('value', term => {
            //         this.repository().search(term);
            //     }),
            //     placeholder: app.translator.trans('flagrow-bazaar.admin.search.placeholder')
            // }),
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

    header() {
        var buttons = [].concat(this.requirementsButtons(), this.connectedButtons());

        return m('div', {className: 'ButtonGroup'}, buttons);
    }

    /**
     * Loads a list of buttons that give insight in the state of this installation.
     * @returns {Array}
     */
    requirementsButtons() {
        let memory_limit_met = app.data.settings['flagrow.bazaar.php.memory_limit-met'] || false;
        let memory_limit = app.data.settings['flagrow.bazaar.php.memory_limit'];
        let memory_requested = app.data.settings['flagrow.bazaar.php.memory_requested'];
        let file_permissions = app.data.settings['flagrow.bazaar.file-permissions'] || [];

        let components = [];

        if (!memory_limit_met) {
            components.push(
                Button.component({
                    className: 'Button Button--icon Requirement-MemoryLimit',
                    icon: 'signal',
                    onclick: () => app.modal.show(new MemoryLimitModal({memory_requested, memory_limit}))
                })
            );
        }

        if (file_permissions.length > 0) {
            components.push(Button.component({
                className: 'Button Button--icon Requirement-FilePermissions',
                icon: 'hdd-o',
                onclick: () => app.modal.show(new FilePermissionsModal({file_permissions}))
            }));
        }

        return components;
    }

    connectedButtons() {
        if (this.connected) {
            return [
                Button.component({
                    className: 'Button Button--icon Connected',
                    icon: 'dashboard',
                    onclick: () => window.open(this.flagrowHost + '/home')
                }),
            ]
        }

        return [
            Button.component({
                className: 'Button Button--icon Connect',
                icon: 'plug',
                onclick: () => app.modal.show(new BazaarConnectModal({flagrowHost: this.flagrowHost}))
            }),
        ]
    }
}
