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

        return <div className={
            'Extension ' +
            (extension.enabled() ? 'enabled ' : 'disabled ') +
            (extension.installed() ? 'installed ' : 'uninstalled ') +
            (extension.outdated() ? 'outdated ' : '') +
            (extension.pending() ? 'pending ' : '') +
            (controls.length > 0 ? 'hasControls' : '')
        } key={extension.id()} data-id={extension.id()}>
            <span className="Extension-icon" style={extension.icon() || ''} title={extension.description()}>
              {extension.icon() ? icon('fas fa-' + extension.icon().name) : ''}
            </span>
            <div className="Extension-meta">
                <ul className="ExtensionListItem-badges badges">
                    {badges}
                </ul>
                <label className="ExtensionListItem-title">
                    {extension.title() || extension.package()}
                </label>
                <label className="ExtensionListItem-vendor">
                    {app.translator.trans('flagrow-bazaar.admin.page.extension.vendor', {
                        vendor: extension.package().split('/')[0]
                    })}
                </label>
                <div className="ExtensionListItem-version">{extension.installed_version() || extension.highest_version()}</div>
                {controls.length ? (
                    <div className="Extension-controls">
                        <Dropdown
                            buttonClassName="Button Button--icon Button--flat"
                            menuClassName="Dropdown-menu--right"
                            icon="fas fa-ellipsis-h">
                            {controls}
                        </Dropdown>
                    </div>
                ) : ''}
            </div>
        </div>;
    }

    controlItems(extension, connected) {
        const items = new ItemList();
        const repository = this.props.repository;

        const favoriteTrans = extension.favorited() ? 'flagrow-bazaar.admin.page.button.remove_favorite_button' : 'flagrow-bazaar.admin.page.button.favorite_button';

        if (connected) {
            items.add('favorite', Button.component({
                icon: 'fas fa-heart',
                children: app.translator.trans(favoriteTrans),
                onclick: () => {
                    repository.favoriteExtension(extension);
                }
            }));
        }

        if (! extension.pending()) {
            if (extension.enabled() && app.extensionSettings[name]) {
                items.add('settings', Button.component({
                    icon: 'fas fa-cog',
                    children: app.translator.trans('core.admin.extensions.settings_button'),
                    onclick: app.extensionSettings[name]
                }));
            }

            if (extension.can_uninstall()) {
                items.add('uninstall', Button.component({
                    icon: 'fas fa-minus-square',
                    children: app.translator.trans('flagrow-bazaar.admin.page.button.uninstall'),
                    onclick: () => {
                        repository.uninstallExtension(extension);
                    }
                }));
            }

            if (extension.can_enable()) {
                items.add('enable', Button.component({
                    icon: 'fas fa-check-square',
                    children: app.translator.trans('flagrow-bazaar.admin.page.button.enable'),
                    onclick: () => {
                        repository.enableExtension(extension);
                    }
                }));
            }

            if (extension.installed() && extension.outdated()) {
                items.add('update', Button.component({
                    icon: 'fas fa-level-up',
                    children: app.translator.trans('flagrow-bazaar.admin.page.button.update'),
                    onclick: () => {
                        repository.updateExtension(extension);
                    }
                }));
            }

            if (extension.can_disable()) {
                items.add('disable', Button.component({
                    icon: 'fas fa-square',
                    children: app.translator.trans('flagrow-bazaar.admin.page.button.disable'),
                    onclick: () => {
                        repository.disableExtension(extension);
                    }
                }));
            }

            if (extension.can_install()) {
                items.add('install', Button.component({
                    icon: 'fas fa-plus-square',
                    children: app.translator.trans('flagrow-bazaar.admin.page.button.install'),
                    onclick: () => {
                        repository.installExtension(extension);
                    }
                }));
            }
        }

        if (extension.premium() && !connected) {
            items.add('subscribe', Button.component({
                disabled: true,
                icon: 'fas fa-shopping-cart',
                children: app.translator.trans('flagrow-bazaar.admin.page.button.connect_to_subscribe'),
            }));
        }

        if (extension.canCheckout() && connected) {
            items.add('subscribe', Button.component({
                icon: 'fas fa-shopping-cart',
                children: app.translator.trans('flagrow-bazaar.admin.page.button.subscribe'),
                onclick: () => {
                    repository.premiumExtensionSubscribe(extension);
                }
            }));
        }

        if (extension.canSafelyUnsubscribe() && connected) {
            items.add('unsubscribe', Button.component({
                icon: 'fas fa-ban',
                children: app.translator.trans('flagrow-bazaar.admin.page.button.unsubscribe'),
                onclick: () => {
                    repository.premiumExtensionUnsubscribe(extension);
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

        if (extension.subscribed()) {
            items.add('subscribed', <Badge icon="fas fa-shopping-cart"
                type="subscribed"
                label={app.translator.trans('flagrow-bazaar.admin.page.extension.subscribed')} />);
        } else if (extension.premium()) {
            items.add('premium', <Badge icon="fas fa-certificate"
                type="premium"
                label={app.translator.trans('flagrow-bazaar.admin.page.extension.premium')} />);
        }
        if (extension.pending()) {
            items.add('pending', <Badge icon="fas fa-circle-notch fa-spin"
                type="pending"
                label={app.translator.trans('flagrow-bazaar.admin.page.extension.pending')} />);
        }

        if (extension.installed() && extension.outdated()) {
            items.add('outdated', <Badge icon="fas fa-warning"
                type="outdated"
                label={app.translator.trans('flagrow-bazaar.admin.page.extension.outdated',
                    { new: extension.highest_version() })} />)
        }

        if (extension.favorited()) {
            items.add('favorited', <Badge icon="fas fa-heart"
                type="favorited"
                label={app.translator.trans('flagrow-bazaar.admin.page.extension.favorited')} />)
        }

        if (extension.installed() && !extension.enabled()) {
            items.add('installed', <Badge icon="fas fa-plus-square"
                type="installed"
                label={app.translator.trans('flagrow-bazaar.admin.page.extension.installed')} />)
        }

        if (extension.enabled()) {
            items.add('enabled', <Badge icon="fas fa-check-square"
                type="enabled"
                label={app.translator.trans('flagrow-bazaar.admin.page.extension.enabled')} />)
        }

        return items;
    }
}
