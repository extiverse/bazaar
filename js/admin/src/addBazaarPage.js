import {extend} from 'flarum/extend';
import app from 'flarum/app';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import BazaarPage from 'flagrow/bazaar/components/BazaarPage';

export default function () {
    // create the route
    app.routes['flagrow-bazaar'] = {path: '/flagrow/bazaar', component: BazaarPage.component()};

    // Add tab to admin menu
    extend(AdminNav.prototype, 'items', items => {
        items.add('flagrow-bazaar', AdminLinkButton.component({
            href: app.route('flagrow-bazaar'),
            icon: 'fas fa-shopping-bag',
            children: app.translator.trans('flagrow-bazaar.admin.nav.title'),
            description: app.translator.trans('flagrow-bazaar.admin.nav.description')
        }));
    });
}
