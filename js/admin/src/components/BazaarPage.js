import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import ExtensionRepository from 'flagrow/bazaar/utils/ExtensionRepository';

export default class BazaarPage extends Component {
    init() {
        this.repository = new ExtensionRepository;
        this.repository.loadNextPage();
    }

    view() {
        return m('ul', [
            this.repository.extensions().map(
                extension => m('li', [
                    extension.package(),
                    extension.can_install() ? Button.component({
                        type: 'button',
                        className: 'Button',
                        children: 'Install',
                        onclick: () => {
                            this.repository.installExtension(extension);
                        }
                    }) : '',
                    extension.can_uninstall() ? Button.component({
                        type: 'button',
                        className: 'Button',
                        children: 'Uninstall',
                        onclick: () => {
                            this.repository.uninstallExtension(extension);
                        }
                    }) : ''
                ])
            ),
            m('li', Button.component({
                type: 'button',
                className: 'Button',
                children: 'More',
                onclick: () => {
                    this.repository.loadNextPage();
                }
            }))
        ]);
    }
}
