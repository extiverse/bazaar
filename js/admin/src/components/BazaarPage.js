import Component from 'flarum/Component';
import ExtensionRepository from 'flagrow/bazaar/utils/ExtensionRepository';

export default class BazaarPage extends Component {
    init() {
        this.repository = new ExtensionRepository;
    }

    view() {
        return m('ul', [
            this.repository.extensions().map(
                extension => m('li', extension.package())
            ),
            m('li', m('button', {onclick: () => {
                this.repository.loadNextPage();
            }}, 'More'))
        ]);
    }
}
