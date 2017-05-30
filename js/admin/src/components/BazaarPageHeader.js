import app from 'flarum/app';
import Component from 'flarum/Component';
import LinkButton from 'flarum/components/LinkButton';
import Button from 'flarum/components/Button';
import FilePermissionsModal from 'flagrow/bazaar/modals/FilePermissionsModal';
import MemoryLimitModal from 'flagrow/bazaar/modals/MemoryLimitModal';
import BazaarConnectModal from 'flagrow/bazaar/modals/BazaarConnectModal';

export default class BazaarPageHeader extends Component {
    view() {
        return (
            <div className="ExtensionsPage-header">
                <div className="container">
                    { this.header() }
                </div>
            </div>
        );
    }

    header() {
        let buttons = [].concat(this.requirementsButtons(), this.connectedButtons(), this.pagesButtons());

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
        let connected = this.props.connected;
        let flagrowHost = app.data.settings['flagrow.bazaar.flagrow-host'] || 'https://flagrow.io';

        if (connected) {
            return [
                Button.component({
                    className: 'Button Button--icon Connected',
                    icon: 'dashboard',
                    onclick: () => window.open(flagrowHost + '/home')
                }),
            ]
        }

        return [
            Button.component({
                className: 'Button Button--icon Connect',
                icon: 'plug',
                onclick: () => app.modal.show(new BazaarConnectModal({flagrowHost: flagrowHost}))
            }),
        ]
    }

    pagesButtons() {
        // Sometimes no route has been set as the current one
        if (typeof app.current === 'undefined') {
            return null;
        }

        const routeName = app.current.props.routeName;
        let links = [];

        if (routeName !== 'flagrow-bazaar') {
            links.push(LinkButton.component({
                className: 'Button Button--icon',
                icon: 'shopping-bag',
                href: app.route('flagrow-bazaar'),
                title: app.translator.trans('flagrow-bazaar.admin.header.extensions')
            }));
        }

        if (routeName !== 'flagrow-bazaar-tasks') {
            links.push(LinkButton.component({
                className: 'Button Button--icon',
                icon: 'history',
                href: app.route('flagrow-bazaar-tasks'),
                title: app.translator.trans('flagrow-bazaar.admin.header.tasks')
            }));
        }

        return links;
    }
}
