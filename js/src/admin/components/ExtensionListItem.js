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
        const repository = this.props.repository;

        return <div className={
            'Extension ' +
            (extension.enabled() ? 'enabled ' : 'disabled ') +
            (extension.installed() ? 'installed ' : 'uninstalled ') +
            (extension.outdated() ? 'outdated ' : '') +
            (extension.pending() ? 'pending ' : '') +
            (controls.length > 0 ? 'hasControls' : '') +
            (extension.favorited() ? 'favorited' : '') +
            (extension.flarumCompatibilityCurrent() ? ' compatible' : 'incompatible')
        } key={extension.id()} data-id={extension.id()}>
            <span className="Extension-icon" style={extension.icon() || ''} title={extension.description()}>
              {extension.icon() ? icon('fas fa-' + extension.icon().name) : ''}
            </span>
            <div className="Extension-meta">
                <ul className="ExtensionListItem-badges badges">
                    {badges}
                </ul>
                <label className="Meta-Title">
                    {extension.title() || extension.package()}
                </label>

                <div className="Meta-Item description">
                    {extension.description()}
                </div>

                <div className="Meta-Item vendor">
                    <div className="label"><i className="fas fa-user"></i> {app.translator.trans('bazaar.admin.page.extension.vendor')}</div>
                    <div className="value">{extension.package().split('/')[0]}</div>
                </div>
                <div className="Meta-Item downloads">
                    <div className="label"><i class="fas fa-download"></i> {app.translator.trans('bazaar.admin.page.extension.downloads')}</div>
                    <div className="value">{extension.downloads()}</div>
                </div>
                <div className="Meta-Item favorites">
                    <div className="label"><i className="fas fa-heart"></i> {app.translator.trans('bazaar.admin.page.extension.favorites')}</div>
                    <div className="value">{extension.favorites()}</div>
                </div>
                {extension.installed_version() ? (
                    <div className="Meta-Item version">
                        <div className="label">{app.translator.trans('bazaar.admin.page.extension.installed_version')}</div>
                        <div className="value">{extension.installed_version()}</div>
                    </div>
                ) : ''}
                <div className="Meta-Item version">
                    <div className="label">{app.translator.trans('bazaar.admin.page.extension.highest_version')}</div>
                    <div className="value">{extension.highest_version()}</div>
                </div>
                <div className="Extension-controls">
                    {connected ? (
                        <Button
                            className="Button Button--icon Button--flat favorite"
                            icon={(extension.favorited() ? 'fas' : 'far') + ' fa-heart'}
                            onclick={() => repository.favoriteExtension(extension)}>
                        </Button>
                    ) : ''}
                    {extension.discuss_link() ? (
                        <Button
                            className="Button Button--icon Button--flat"
                            icon="fas fa-comments"
                            onclick={() => window.open(extension.discuss_link())}>
                        </Button>
                    ) : ''}
                    {extension.landing_link() ? (
                        <Button
                            className="Button Button--icon Button--flat"
                            icon="fas fa-chart-line"
                            onclick={() => window.open(extension.landing_link())}>
                        </Button>
                    ) : ''}
                    {controls.length > 0 ? (
                        <Dropdown
                            buttonClassName="Button Button--icon Button--flat"
                            menuClassName="Dropdown-menu--right"
                            icon="fas fa-ellipsis-h">
                            {controls}
                        </Dropdown>
                    ) : ''}
                </div>
            </div>
        </div>;
    }

    controlItems(extension, connected) {
        const items = new ItemList();
        const repository = this.props.repository;

        const favoriteTrans = extension.favorited() ? 'bazaar.admin.page.button.remove_favorite_button' : 'bazaar.admin.page.button.favorite_button';

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
                    children: app.translator.trans('bazaar.admin.page.button.uninstall'),
                    onclick: () => {
                        this.props.extension = repository.uninstallExtension(extension);
                    }
                }));
            }

            if (extension.can_enable()) {
                items.add('enable', Button.component({
                    icon: 'fas fa-check-square',
                    children: app.translator.trans('bazaar.admin.page.button.enable'),
                    onclick: () => {
                        repository.enableExtension(extension);
                    }
                }));
            }

            if (extension.installed() && extension.outdated()) {
                items.add('update', Button.component({
                    icon: 'fas fa-level-up',
                    children: app.translator.trans('bazaar.admin.page.button.update'),
                    onclick: () => {
                        this.props.extension = repository.updateExtension(extension);
                    }
                }));
            }

            if (extension.can_disable()) {
                items.add('disable', Button.component({
                    icon: 'fas fa-square',
                    children: app.translator.trans('bazaar.admin.page.button.disable'),
                    onclick: () => {
                        this.props.extension = repository.disableExtension(extension);
                    }
                }));
            }

            if (extension.can_install()) {
                items.add('install', Button.component({
                    icon: 'fas fa-plus-square',
                    children: app.translator.trans('bazaar.admin.page.button.install'),
                    onclick: () => {
                        this.props.extension = repository.installExtension(extension);
                    }
                }));
            }
        }

        if (extension.premium() && !connected) {
            items.add('subscribe', Button.component({
                disabled: true,
                icon: 'fas fa-shopping-cart',
                children: app.translator.trans('bazaar.admin.page.button.connect_to_subscribe'),
            }));
        }

        if (extension.canCheckout() && connected) {
            items.add('subscribe', Button.component({
                icon: 'fas fa-shopping-cart',
                children: app.translator.trans('bazaar.admin.page.button.subscribe'),
                onclick: () => {
                    repository.premiumExtensionSubscribe(extension);
                }
            }));
        }

        if (extension.canSafelyUnsubscribe() && connected) {
            items.add('unsubscribe', Button.component({
                icon: 'fas fa-ban',
                children: app.translator.trans('bazaar.admin.page.button.unsubscribe'),
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

        if (!extension.flarumCompatibilityNext()) {
            items.add('nextIncompatible', <Badge icon="fas fa-exclamation"
                   type="nextIncompatible"
                   label={app.translator.trans('bazaar.admin.page.extension.next_incompatible')} />)
        }
        if (!extension.flarumCompatibilityLatest()) {
            items.add('latestIncompatible', <Badge icon="fas fa-exclamation-circle"
                 type="latestIncompatible"
                 label={app.translator.trans('bazaar.admin.page.extension.latest_incompatible')} />)
        }
        if (!extension.flarumCompatibilityCurrent()) {
            items.add('incompatible', <Badge icon="fas fa-exclamation-triangle"
                 type="incompatible"
                 label={app.translator.trans('bazaar.admin.page.extension.incompatible')} />)
        }
        if (extension.subscribed()) {
            items.add('subscribed', <Badge icon="fas fa-shopping-cart"
                type="subscribed"
                label={app.translator.trans('bazaar.admin.page.extension.subscribed')} />);
        } else if (extension.premium()) {
            items.add('premium', <Badge icon="fas fa-certificate"
                type="premium"
                label={app.translator.trans('bazaar.admin.page.extension.premium')} />);
        }
        if (extension.pending()) {
            items.add('pending', <Badge icon="fas fa-circle-notch fa-spin"
                type="pending"
                label={app.translator.trans('bazaar.admin.page.extension.pending')} />);
        }
        if (extension.installed() && extension.outdated()) {
            items.add('outdated', <Badge icon="fas fa-sort-numeric-down"
                type="outdated"
                label={app.translator.trans('bazaar.admin.page.extension.outdated', {new: extension.highest_version() })} />)
        }
        if (extension.favorited()) {
            items.add('favorited', <Badge icon="fas fa-heart"
                type="favorited"
                label={app.translator.trans('bazaar.admin.page.extension.favorited')} />)
        }
        if (extension.installed() && !extension.enabled()) {
            items.add('installed', <Badge icon="fas fa-plus-square"
                type="installed"
                label={app.translator.trans('bazaar.admin.page.extension.installed')} />)
        }
        if (extension.enabled()) {
            items.add('enabled', <Badge icon="fas fa-check-square"
                type="enabled"
                label={app.translator.trans('bazaar.admin.page.extension.enabled')} />)
        }

        return items;
    }
}
