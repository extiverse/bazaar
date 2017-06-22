import Checkbox from "flarum/components/Checkbox";
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import icon from 'flarum/helpers/icon';

export default class CustomCheckbox extends Checkbox
{
    /**
     * Get the template for the checkbox's display (tick/cross icon).
     *
     * @return {*}
     * @protected
     */
    getDisplay() {
        const iconChecked = this.props.iconChecked || 'check';
        const iconUnchecked = this.props.iconUnchecked || 'times';

        return this.loading
            ? LoadingIndicator.component({size: 'tiny'})
            : icon(this.props.state ? iconChecked : iconUnchecked);
    }
}
