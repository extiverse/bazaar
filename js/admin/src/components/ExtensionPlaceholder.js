import Component from 'flarum/Component';

/**
 * The `Placeholder` component displays a muted text with some call to action,
 * usually used as an empty state.
 *
 * ### Props
 *
 * - `text`
 */
export default class ExtensionPlaceholder extends Component {
    view() {
        return <li className={
            'ExtensionListItem Placeholder'
        }>
            <div className="ExtensionListItem-content">
                      <span className="ExtensionListItem-icon ExtensionIcon" style={extension.icon() || ''}>
                        {extension.icon() ? icon(extension.icon().name) : ''}
                      </span>
                <label className="ExtensionListItem-title">
                    {this.props.text}
                </label>

            </div>
        </li>;
    }
}
