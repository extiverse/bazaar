import Component from "flarum/Component";
import CustomCheckbox from "./CustomCheckbox";
import debounce from "../utils/debounce";

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
                    placeholder: app.translator.trans('bazaar.admin.search.placeholder'),
                })
            ),
            m('div', {className: 'ExtensionFilters ButtonGroup'}, [
                CustomCheckbox.component({
                    icon: 'fas fa-level-up',
                    className: 'Button hasIcon',
                    state: this.isToggled('update'),
                    onchange: (checked) => this.toggleFilter('update', checked),
                    children: app.translator.trans('bazaar.admin.search.filter_update')
                }),
                CustomCheckbox.component({
                    icon: 'fas fa-circle-notch',
                    className: 'Button hasIcon',
                    state: this.isToggled('pending'),
                    onchange: (checked) => this.toggleFilter('pending', checked),
                    children: app.translator.trans('bazaar.admin.search.filter_pending')
                }),
                CustomCheckbox.component({
                    icon: 'fas fa-plus-square',
                    className: 'Button hasIcon',
                    state: this.isToggled('installed'),
                    onchange: (checked) => this.toggleFilter('installed', checked),
                    children: app.translator.trans('bazaar.admin.search.filter_installed')
                }),
                this.connected ? [
                    CustomCheckbox.component({
                        icon: 'fas fa-heart',
                        className: 'Button hasIcon',
                        state: this.isToggled('favorited'),
                        onchange: (checked) => this.toggleFilter('favorited', checked),
                        children: app.translator.trans('bazaar.admin.search.filter_favorited')
                    }),
                    CustomCheckbox.component({
                        icon: 'fas fa-shopping-cart',
                        className: 'Button hasIcon',
                        state: this.isToggled('subscribed'),
                        onchange: (checked) => this.toggleFilter('subscribed', checked),
                        children: app.translator.trans('bazaar.admin.search.filter_subscribed')
                    }),
                ] : '',
                CustomCheckbox.component({
                    icon: 'fas fa-certificate',
                    className: 'Button hasIcon',
                    state: this.isToggled('premium'),
                    onchange: (checked) => this.toggleFilter('premium', checked),
                    children: app.translator.trans('bazaar.admin.search.filter_premium')
                }),
            ])
        ])
    }

    isToggled(name) {
        const filter = this.props.params.filter || {};
        const is = filter.is || [];

        return is.indexOf(name) >= 0;
    }

    toggleFilter(name, checked) {
        let filter = this.props.params.filter || {};
        let is = filter.is || [];

        const i = is.indexOf(name);

        if (checked && i === -1) {
            is.push(name);
        } else if (!checked && i >= 0) {
            is.splice(i, 1);
        }

        filter.is = is;

        this.props.params.filter = filter;

        this.updateDebounce();
    }

    search(term) {
        this.props.params.q = term;

        this.updateDebounce();
    }
}
