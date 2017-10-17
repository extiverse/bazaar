import Component from "flarum/Component";
import icon from "flarum/helpers/icon";
import ItemList from "flarum/utils/ItemList";
import Button from "flarum/components/Button";
import Dropdown from "flarum/components/Dropdown";
import Badge from 'flarum/components/Badge';

export default class ExtensionListItem extends Component {


    config(isInitialized) {
        if (isInitialized) return;

        // Be careful to always use a `key` with this component or this mis-align the tooltips if items are added or removed
        if (this.props.extension.description()) this.$('.ExtensionIcon').tooltip({container: 'body'});
    }

    view() {
        const extension = this.props.extension;
        const connected = this.props.connected || false;
        const controls = this.controlItems(extension, connected).toArray();
        const badges = this.badges(extension).toArray();

        return <li className={
            'ExtensionListItem ' +
            (extension.enabled() ? 'enabled ' : 'disabled ') +
            (extension.installed() ? 'installed ' : 'uninstalled ') +
            (extension.outdated() ? 'outdated ' : '') +
            (extension.pending() ? 'pending ' : '')
        }>
            <div className="ExtensionListItem-content">
                      <span className="ExtensionListItem-icon ExtensionIcon" style={extension.icon() || ''} title={extension.description()}>
                        {extension.icon() ? icon(extension.icon().name) : ''}
                      </span>


                <ul className="ExtensionListItem-badges badges">
                    {badges}
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
                <label className="ExtensionListItem-vendor">
                    {app.translator.trans('flagrow-bazaar.admin.page.extension.vendor', {
                        vendor: extension.package().split('/')[0]
                    })}
                </label>
                <div className="ExtensionListItem-version">{extension.installed_version() || extension.highest_version()}</div>
            </div>
        </li>;
    }

    controlItems(extension, connected) {
        const items = new ItemList();
        const repository = this.props.repository;
        const favoriteTrans = extension.favorited() ? 'flagrow-bazaar.admin.page.button.remove_favorite_button' : 'flagrow-bazaar.admin.page.button.favorite_button';

        if (connected) {
            items.add('favorite', Button.component({
                icon: 'heart',
                children: app.translator.trans(favoriteTrans),
                onclick: () => {
                    repository().favoriteExtension(extension);
                }
            }));
        }

        if (!extension.pending()) {
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
                        repository()
                            .uninstallExtension(extension);
                    }
                }));
                items.add('enable', Button.component({
                    icon: 'check-square-o',
                    children: app.translator.trans('flagrow-bazaar.admin.page.button.enable'),
                    onclick: () => {
                        repository()
                            .enableExtension(extension);
                    }
                }));
            }

            if (extension.installed() && extension.outdated()) {
                items.add('update', Button.component({
                    icon: 'toggle-up',
                    children: app.translator.trans('flagrow-bazaar.admin.page.button.update'),
                    onclick: () => {
                        repository()
                            .updateExtension(extension);
                    }
                }));
            }

            if (extension.installed() && extension.enabled()) {
                items.add('disable', Button.component({
                    icon: 'square-o',
                    children: app.translator.trans('flagrow-bazaar.admin.page.button.disable'),
                    onclick: () => {
                        repository()
                            .disableExtension(extension);
                    }
                }));
            }

            if (!extension.installed()) {
                items.add('install', Button.component({
                    icon: 'plus-square-o',
                    children: app.translator.trans('flagrow-bazaar.admin.page.button.install'),
                    onclick: () => {
                        repository()
                            .installExtension(extension);
                    }
                }));
            }
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

        if (extension.pending()) {
            items.add('pending', <Badge icon="circle-o-notch fa-spin" type="pending"
                label={app.translator.trans('flagrow-bazaar.admin.page.extension.pending')}/>);
        }

        if (extension.installed() && extension.outdated()) {
            items.add('favorited', <Badge icon="warning" type="outdated"
                                          label={app.translator.trans('flagrow-bazaar.admin.page.extension.outdated', {new: extension.highest_version()})}/>)
        }

        if (extension.favorited()) {
            items.add('favorited', <Badge icon="heart" type="favorited"
                                          label={app.translator.trans('flagrow-bazaar.admin.page.extension.favorited')}/>)
        }

        if (extension.installed() && !extension.enabled()) {
            items.add('installed', <Badge icon="plus-square" type="installed"
                                          label={app.translator.trans('flagrow-bazaar.admin.page.extension.installed')}/>)
        }
        if (extension.enabled()) {
            items.add('enabled', <Badge icon="check-square" type="enabled"
                                        label={app.translator.trans('flagrow-bazaar.admin.page.extension.enabled')}/>)
        }

        return items;
    }
}
