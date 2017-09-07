import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';
import computed from 'flarum/utils/computed';

export default class Extension extends mixin(Model, {
    package: Model.attribute('package'),
    title: Model.attribute('title'),
    description: Model.attribute('description'),
    license: Model.attribute('license'),
    icon: Model.attribute('icon'),

    stars: Model.attribute('stars'),
    forks: Model.attribute('forks'),
    downloads: Model.attribute('downloads'),

    installed: Model.attribute('installed'),
    enabled: Model.attribute('enabled'),
    installed_version: Model.attribute('installed_version'),
    highest_version: Model.attribute('highest_version'),
    outdated: Model.attribute('outdated'),

    flarum_id: Model.attribute('flarum_id'),

    premium: Model.attribute('premium'),
    subscribed: Model.attribute('subscribed'),

    // Install/uninstall
    // Extension is available if it's either non-premium or premium & subscribed
    can_install: computed('installed', 'premium', 'subscribed', (installed, premium, subscribed) => !installed && (!premium || subscribed)),
    can_uninstall: computed('installed', 'enabled', (installed, enabled) => installed && !enabled),

    // Enable/disable
    can_enable: computed('installed', 'enabled', (installed, enabled) => installed && !enabled),
    can_disable: computed('installed', 'enabled', (installed, enabled) => installed && enabled),

    // Marketplace actions
    can_subscribe: computed('premium', 'subscribed', (premium, subscribed) => premium && !subscribed),
    can_unsubscribe: computed('subscribed', 'installed', (subscribed, installed) => subscribed && !installed),

    favorited: Model.attribute('favorited')
}) {}
