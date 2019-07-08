import Component from 'flarum/Component';
import icon from "flarum/helpers/icon";
import Button from 'flarum/components/Button';
import LinkButton from 'flarum/components/LinkButton';

export default class BazaarLoader extends Component {

    view() {
        const error = this.props.loading() === 'error';

        return m('div', {
            className: 'Bazaar--Loader ' + (error ? 'Error' : null),
            hidden: this.props.loading() === false
        }, [
            m('.Loader-modal', [
                m('.Loader-icon', icon(error ? 'fas fa-exclamation-triangle' : 'fas fa-shopping-bag')),
                m('div', [
                    m('p', app.translator.trans(error ? 'bazaar.admin.loader.error' : 'bazaar.admin.loader.is_loading')),
                    error ? [
                        Button.component({
                            className: 'Button Button--block',
                            icon: 'fas fa-sync',
                            onclick: () => location.reload(),
                            children: app.translator.trans('bazaar.admin.loader.refresh')
                        }),
                        Button.component({
                            className: 'Button Button--block',
                            icon: 'fas fa-times',
                            onclick: () => this.props.loading(false),
                            children: app.translator.trans('bazaar.admin.loader.close')
                        }),
                        LinkButton.component({
                            className: 'Button Button--block',
                            icon: 'fas fa-bug',
                            href: 'https://github.com/flagrow/bazaar/issues',
                            target: '_blank',
                            config: {}, // Disable internal Mithril routing
                            children: app.translator.trans('bazaar.admin.loader.report_issue')
                        }),
                    ] : null
                ])
            ])
        ])
    }
}
