import Component from 'flarum/Component';
import icon from 'flarum/helpers/icon';
import ItemList from 'flarum/utils/ItemList';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';

export default class ExtensionListItem extends Component
{
    view() {
        const extension = this.props.extension;
        const controls = this.controlItems(extension);

        return <li className={'ExtensionListItem ' + (extension.enabled() ? 'enabled ': '') + (extension.installed() ? 'installed' : '')}>
            <div className="ExtensionListItem-content">
                      <span className="ExtensionListItem-icon ExtensionIcon" style={extension.icon()}>
                        {extension.icon() ? icon(extension.icon().name) : ''}
                      </span>
                {controls.length ? (
                        <Dropdown
                            className="ExtensionListItem-controls"
                            buttonClassName="Button Button--icon Button--flat"
                            menuClassName="Dropdown-menu--right"
                            icon="ellipsis-h">
                            {controls}
                        </Dropdown>
                    ) : ''}
                <label className="ExtensionListItem-title">
                    {extension.title()}
                </label>
                <div className="ExtensionListItem-version">{extension.highest_version()}</div>
            </div>
        </li>;
    }

    controlItems(extension) {
        const items = new ItemList();
        const repository = this.props.repository;

        if (extension.enabled() && app.extensionSettings[name]) {
            items.add('settings', Button.component({
                icon: 'cog',
                children: app.translator.trans('core.admin.extensions.settings_button'),
                onclick: app.extensionSettings[name]
            }));
        }

        if (extension.installed() && !extension.enabled()) {
            items.add('uninstall', Button.component({
                icon: 'trash-o',
                children: app.translator.trans('core.admin.extensions.uninstall_button'),
                onclick: () => {
                    repository().uninstallExtension(extension);
                }
            }));
        }

        if (!extension.installed()) {
            items.add('install', Button.component({
                icon: '',
                children: app.translator.trans('core.admin.extensions.install_button'),
                onclick: () => {
                    repository().installExtension(extension);
                }
            }));
        }

        return items;
    }
}
