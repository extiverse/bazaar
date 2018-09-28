import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';
import computed from 'flarum/utils/computed';

export default class Extension extends mixin(Model, {
    package: Model.attribute('package'),
    title: Model.attribute('title'),
    description: Model.attribute('description'),
    license: Model.attribute('license'),
    icon: Model.attribute('icon'),
    locale: Model.attribute('locale'),

    discuss_link: Model.attribute('discuss_link'),
    landing_link: Model.attribute('landing_link'),

    downloads: Model.attribute('downloads'),

    installed: Model.attribute('installed'),
    enabled: Model.attribute('enabled'),
    pending: Model.attribute('pending'),
    installed_version: Model.attribute('installed_version'),
    highest_version: Model.attribute('highest_version'),
    outdated: Model.attribute('outdated'),

    flarum_id: Model.attribute('flarum_id'),

    premium: Model.attribute('premium'),
    subscribed: Model.attribute('subscribed'),

    // Install/uninstall
    // Extension is available if it's either non-premium or premium & subscribed
    can_install: computed('installed', 'premium', 'subscribed', 'flarumCompatibilityCurrent', (installed, premium, subscribed, flarumCompatibilityCurrent) => !installed && flarumCompatibilityCurrent && (!premium || subscribed)),
    can_uninstall: computed('installed', 'enabled', (installed, enabled) => installed && !enabled),

    // Enable/disable
    can_enable: computed('installed', 'enabled', (installed, enabled) => installed && !enabled),
    can_disable: computed('installed', 'enabled', (installed, enabled) => installed && enabled),

    canCheckout: Model.attribute('canCheckout'),
    canUnsubscribe: Model.attribute('canUnsubscribe'),
    canSafelyUnsubscribe: computed('canUnsubscribe', 'installed', (canUnsubscribe, installed) => canUnsubscribe && !installed),

    favorites: Model.attribute('favorites'),
    favorited: Model.attribute('favorited'),

    flarumCompatibilityLatest: Model.attribute('flarumCompatibilityLatest'),
    flarumCompatibilityNext: Model.attribute('flarumCompatibilityNext'),
    flarumCompatibilityCurrent: Model.attribute('flarumCompatibilityCurrent'),
}) {}
