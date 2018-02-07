import Component from "flarum/Component";
import CustomCheckbox from "./CustomCheckbox";

export default class ExtensionSearch extends Component {
    init() {
        this.filter = this.props.params().filter;
        this.q = this.props.params().q;
    }

    view() {
        return m('div', [
            m('fieldset', {className: 'ExtensionSearch'},
                m('input[type=text].FormControl', {
                    value: this.q || '',
                    oninput: m.withAttr('value', term => {
                        params = this.props.params();
                        params.q = term;
                        this.props.params(params);

                        m.redraw();
                    }),
                    placeholder: app.translator.trans('flagrow-bazaar.admin.search.placeholder'),
                })
            ),
            m('div', {className: 'ExtensionFilters ButtonGroup'}, [
                CustomCheckbox.component({
                    icon: 'toggle-up',
                    className: 'Button hasIcon',
                    state: this.filter == 'update_required',
                    onchange: (checked) => this.toggleFilter('update_required'),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_update_required')
                }),
                CustomCheckbox.component({
                    icon: 'circle-o-notch',
                    className: 'Button hasIcon',
                    state: this.filter == 'pending',
                    onchange: (checked) => this.toggleFilter('pending'),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_pending')
                }),
                CustomCheckbox.component({
                    icon: 'plus-square',
                    className: 'Button hasIcon',
                    state: this.filter == 'installed',
                    onchange: (checked) => this.toggleFilter('installed'),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_installed')
                }),
                CustomCheckbox.component({
                    icon: 'inr',
                    className: 'Button hasIcon',
                    state: this.filter == 'languages',
                    onchange: (checked) => this.toggleFilter('languages'),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_languages')
                }),
                this.connected ? [
                    CustomCheckbox.component({
                        icon: 'heart',
                        className: 'Button hasIcon',
                        state: this.filter == 'favorited',
                        onchange: (checked) => this.toggleFilter('favorited'),
                        children: app.translator.trans('flagrow-bazaar.admin.search.filter_favorited')
                    }),
                    CustomCheckbox.component({
                        icon: 'shopping-cart',
                        className: 'Button hasIcon',
                        state: this.filter == 'subscribed',
                        onchange: (checked) => this.toggleFilter('subscribed'),
                        children: app.translator.trans('flagrow-bazaar.admin.search.filter_subscribed')
                    }),
                ] : '',
                CustomCheckbox.component({
                    icon: 'certificate',
                    className: 'Button hasIcon',
                    state: this.filter == 'is_premium',
                    onchange: (checked) => this.toggleFilter('is_premium'),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_premium')
                }),
            ])
        ])
    }

    toggleFilter(filter) {
        const params = this.props.params();

        if (params.filter == filter) {
            params.filter = null;
        } else {
            params.filter = filter;
        }

        this.props.params(params);

        m.redraw();
    }
}
