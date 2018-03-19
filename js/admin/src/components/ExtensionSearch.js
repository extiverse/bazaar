import Component from "flarum/Component";
import CustomCheckbox from "./CustomCheckbox";
import debounce from "./../utils/debounce";

export default class ExtensionSearch extends Component {
    init() {
        this.updateDebounce = debounce(() => {
            if (this.props.onsubmit) this.props.onsubmit(this.props.params);
        }, 500);
    }

    view() {
        return m('div', [
            m('fieldset', {className: 'ExtensionSearch'},
                m('input[type=text].FormControl', {
                    value: this.props.params.q || '',
                    oninput: m.withAttr('value', term => this.search(term)),
                    placeholder: app.translator.trans('flagrow-bazaar.admin.search.placeholder'),
                })
            ),
            m('div', {className: 'ExtensionFilters ButtonGroup'}, [
                CustomCheckbox.component({
                    icon: 'toggle-up',
                    className: 'Button hasIcon',
                    state: this.props.params.filter == 'update_required',
                    onchange: (checked) => this.toggleFilter('update_required', checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_update_required')
                }),
                CustomCheckbox.component({
                    icon: 'circle-o-notch',
                    className: 'Button hasIcon',
                    state: this.props.params.filter == 'pending',
                    onchange: (checked) => this.toggleFilter('pending', checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_pending')
                }),
                CustomCheckbox.component({
                    icon: 'plus-square',
                    className: 'Button hasIcon',
                    state: this.props.params.filter == 'installed',
                    onchange: (checked) => this.toggleFilter('installed', checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_installed')
                }),
                this.connected ? [
                    CustomCheckbox.component({
                        icon: 'heart',
                        className: 'Button hasIcon',
                        state: this.props.params.filter == 'favorited',
                        onchange: (checked) => this.toggleFilter('favorited', checked),
                        children: app.translator.trans('flagrow-bazaar.admin.search.filter_favorited')
                    }),
                    CustomCheckbox.component({
                        icon: 'shopping-cart',
                        className: 'Button hasIcon',
                        state: this.props.params.filter == 'subscribed',
                        onchange: (checked) => this.toggleFilter('subscribed', checked),
                        children: app.translator.trans('flagrow-bazaar.admin.search.filter_subscribed')
                    }),
                ] : '',
                CustomCheckbox.component({
                    icon: 'certificate',
                    className: 'Button hasIcon',
                    state: this.props.params.filter == 'is_premium',
                    onchange: (checked) => this.toggleFilter('is_premium', checked),
                    children: app.translator.trans('flagrow-bazaar.admin.search.filter_premium')
                }),
            ])
        ])
    }

    toggleFilter(filter, checked) {
        if (checked) {
            this.props.params.filter = filter;
        } else {
            this.props.params.filter = null;
        }

        this.updateDebounce();
    }

    search(term) {
        this.props.params.q = term;

        this.updateDebounce();
    }
}
