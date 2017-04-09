import app from 'flarum/app';
import Component from 'flarum/Component';
import LinkButton from 'flarum/components/LinkButton';

export default class BazaarPageHeader extends Component {
    view() {
        return (
            <div className="ExtensionsPage-header">
                <div className="container">
                    {LinkButton.component({
                        children: app.translator.trans('flagrow-bazaar.admin.header.extensions'),
                        icon: 'plus',
                        className: 'Button Button--primary',
                        href: app.route('flagrow-bazaar')
                    })}
                    {LinkButton.component({
                        children: app.translator.trans('flagrow-bazaar.admin.header.tasks'),
                        icon: 'plus',
                        className: 'Button Button--primary',
                        href: app.route('flagrow-bazaar-tasks')
                    })}
                </div>
            </div>
        );
    }
}
