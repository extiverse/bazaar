import Component from "flarum/Component";
import icon from "flarum/helpers/icon";
import ItemList from "flarum/utils/ItemList";
import Button from "flarum/components/Button";
import Dropdown from "flarum/components/Dropdown";
import Badge from 'flarum/components/Badge';

export default class ExtensionListItem extends Component {


    config(isInitialized) {
        if (isInitialized) return;

        if (this.props.extension.description()) this.$().tooltip({container: 'body'});
    }

    view() {
        const extension = this.props.extension;
        const controls = this.controlItems(extension).toArray();

        return <li className={
            'ExtensionListItem ' +
            (extension.enabled() ? 'enabled ' : 'disabled ') +
            (extension.installed() ? 'installed' : 'uninstalled') +
            (extension.enabled() && extension.highest_version() && extension.installed_version() != extension.highest_version() ? 'update' : '')
        } title={extension.description()}>
            <div className="ExtensionListItem-content">
                      <span className="ExtensionListItem-icon ExtensionIcon" style={extension.icon() || ''}>
                        {extension.icon() ? icon(extension.icon().name) : ''}
                      </span>


                <ul className="ExtensionListItem-badges badges">
                    {this.badges(extension).toArray()}
                </ul>
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
                    {extension.title() || extension.package()}
                </label>
                <label className="ExtensionListItem-version">
                    {app.translator.trans('flagrow-bazaar.admin.page.extension.vendor', {
                        vendor: extension.package().split('/')[0]
                    })}
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
                icon: 'minus-square-o',
                children: app.translator.trans('flagrow-bazaar.admin.page.button.uninstall'),
                onclick: () => {
                    repository().uninstallExtension(extension);
                }
            }));
            items.add('enable', Button.component({
                icon: 'check-square-o',
                children: app.translator.trans('flagrow-bazaar.admin.page.button.enable'),
                onclick: () => {
                    repository().enableExtension(extension);
                }
            }));
        }

        if (extension.installed() && extension.enabled()) {
            items.add('disable', Button.component({
                icon: 'square-o',
                children: app.translator.trans('flagrow-bazaar.admin.page.button.disable'),
                onclick: () => {
                    repository().disableExtension(extension);
                }
            }));
        }

        if (!extension.installed()) {
            items.add('install', Button.component({
                icon: 'plus-square-o',
                children: app.translator.trans('flagrow-bazaar.admin.page.button.install'),
                onclick: () => {
                    repository().installExtension(extension);
                }
            }));
        }

        return items;
    }

    /**
     * Get the Badge components that apply to this discussion.
     *
     * @return {ItemList}
     * @public
     */
    badges(extension) {
        const items = new ItemList();

        if (extension.installed()) {
            items.add('installed', <Badge icon="plus-square" type="installed" label={app.translator.trans('flagrow-bazaar.admin.page.extension.installed')}/>)
        }
        if (extension.enabled()) {
            items.add('enabled', <Badge icon="check-square" type="enabled" label={app.translator.trans('flagrow-bazaar.admin.page.extension.enabled')}/>)
        }

        return items;
    }
}
