import Component from 'flarum/Component';
import icon from "flarum/helpers/icon";


export default class BazaarLoader extends Component {

    view() {
        return m('div', {
            className: 'Bazaar--Loader',
            hidden: !this.props.loading()
        }, [
            m('div', [
                icon('shopping-cart'),
                m('span', [
                    app.translator.trans('flagrow-bazaar.admin.loader.is_loading')
                ])
            ])
        ])
    }
}
