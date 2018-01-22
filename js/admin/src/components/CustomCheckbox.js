import Button from "flarum/components/Button";
import icon from 'flarum/helpers/icon';
import extract from 'flarum/utils/extract';
import extractText from 'flarum/utils/extractText';

export default class CustomCheckbox extends Button {
    view() {
        const attrs = Object.assign({}, this.props);

        delete attrs.state;
        delete attrs.children;

        attrs.className = attrs.className || '';
        attrs.type = attrs.type || 'button';

        if (this.props.state) attrs.className += ' active';

        // If nothing else is provided, we use the textual button content as tooltip
        if (!attrs.title && this.props.children) {
            attrs.title = extractText(this.props.children);
        }

        const iconName = extract(attrs, 'icon');
        if (iconName) attrs.className += ' hasIcon';

        const loading = extract(attrs, 'loading');
        if (attrs.disabled || loading) {
            attrs.className += ' disabled' + (loading ? ' loading' : '');
            delete attrs.onclick;
        }

        return (
            <button {...attrs}
                onclick={this.onchange.bind(this)}
                >
                {this.getButtonContent()}
            </button>
        );
    }

    /**
     * Run a callback when the state of the checkbox is changed.
     *
     * @param {Boolean} checked
     * @protected
     */
    onchange() {
        if (this.props.onchange) this.props.onchange(! this.props.state, this);
    }
}
