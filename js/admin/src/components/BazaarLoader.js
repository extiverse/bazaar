import Component from 'flarum/Component';
import icon from "flarum/helpers/icon";
import Button from 'flarum/components/Button';

export default class BazaarLoader extends Component {

    view() {
        const error = this.props.loading() === 'error';

        return m('div', {
            className: 'Bazaar--Loader',
            hidden: this.props.loading() === false
        }, [
            m('.Loader-modal', [
                m('.Loader-icon', icon(error ? 'exclamation-triangle' : 'shopping-cart')),
                m('div', [
                    app.translator.trans(error ? 'flagrow-bazaar.admin.loader.error' : 'flagrow-bazaar.admin.loader.is_loading'),
                    error ? Button.component({
                        className: 'Button',
                        icon: 'refresh',
                        onclick: () => location.reload(),
                        children: app.translator.trans('flagrow-bazaar.admin.loader.refresh')
                    }) : null
                ])
            ])
        ])
    }
}
