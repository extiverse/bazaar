'use strict';

System.register('flagrow/bazaar/addBazaarPage', ['flarum/extend', 'flarum/app', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'flagrow/bazaar/components/BazaarPage'], function (_export, _context) {
    "use strict";

    var extend, app, AdminNav, AdminLinkButton, BazaarPage;

    _export('default', function () {
        // create the route
        app.routes['flagrow-bazaar'] = { path: '/flagrow/bazaar', component: BazaarPage.component() };

        // Add tab to admin menu
        extend(AdminNav.prototype, 'items', function (items) {
            items.add('flagrow-bazaar', AdminLinkButton.component({
                href: app.route('flagrow-bazaar'),
                icon: 'shopping-bag',
                children: app.translator.trans('flagrow-bazaar.admin.nav.title'),
                description: app.translator.trans('flagrow-bazaar.admin.nav.description')
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_flagrowBazaarComponentsBazaarPage) {
            BazaarPage = _flagrowBazaarComponentsBazaarPage.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/bazaar/components/BazaarLoader', ['flarum/Component', 'flarum/helpers/icon'], function (_export, _context) {
    "use strict";

    var Component, icon, BazaarLoader;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }],
        execute: function () {
            BazaarLoader = function (_Component) {
                babelHelpers.inherits(BazaarLoader, _Component);

                function BazaarLoader() {
                    babelHelpers.classCallCheck(this, BazaarLoader);
                    return babelHelpers.possibleConstructorReturn(this, (BazaarLoader.__proto__ || Object.getPrototypeOf(BazaarLoader)).apply(this, arguments));
                }

                babelHelpers.createClass(BazaarLoader, [{
                    key: 'view',
                    value: function view() {
                        return m('div', {
                            className: 'Bazaar--Loader',
                            hidden: !this.props.loading()
                        }, [m('div', [icon('shopping-cart'), m('span', [app.translator.trans('flagrow-bazaar.admin.loader.is_loading')])])]);
                    }
                }]);
                return BazaarLoader;
            }(Component);

            _export('default', BazaarLoader);
        }
    };
});;
"use strict";

System.register("flagrow/bazaar/components/BazaarPage", ["flarum/Component", "flagrow/bazaar/utils/ExtensionRepository", "flagrow/bazaar/components/ExtensionListItem", "flagrow/bazaar/components/BazaarLoader", "flarum/components/Button", "flagrow/bazaar/modals/FilePermissionsModal", "flagrow/bazaar/modals/MemoryLimitModal", "flagrow/bazaar/modals/BazaarConnectModal", "flagrow/bazaar/components/CustomCheckbox"], function (_export, _context) {
    "use strict";

    var Component, ExtensionRepository, ExtensionListItem, BazaarLoader, Button, FilePermissionsModal, MemoryLimitModal, BazaarConnectModal, CustomCheckbox, BazaarPage;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flagrowBazaarUtilsExtensionRepository) {
            ExtensionRepository = _flagrowBazaarUtilsExtensionRepository.default;
        }, function (_flagrowBazaarComponentsExtensionListItem) {
            ExtensionListItem = _flagrowBazaarComponentsExtensionListItem.default;
        }, function (_flagrowBazaarComponentsBazaarLoader) {
            BazaarLoader = _flagrowBazaarComponentsBazaarLoader.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowBazaarModalsFilePermissionsModal) {
            FilePermissionsModal = _flagrowBazaarModalsFilePermissionsModal.default;
        }, function (_flagrowBazaarModalsMemoryLimitModal) {
            MemoryLimitModal = _flagrowBazaarModalsMemoryLimitModal.default;
        }, function (_flagrowBazaarModalsBazaarConnectModal) {
            BazaarConnectModal = _flagrowBazaarModalsBazaarConnectModal.default;
        }, function (_flagrowBazaarComponentsCustomCheckbox) {
            CustomCheckbox = _flagrowBazaarComponentsCustomCheckbox.default;
        }],
        execute: function () {
            BazaarPage = function (_Component) {
                babelHelpers.inherits(BazaarPage, _Component);

                function BazaarPage() {
                    babelHelpers.classCallCheck(this, BazaarPage);
                    return babelHelpers.possibleConstructorReturn(this, (BazaarPage.__proto__ || Object.getPrototypeOf(BazaarPage)).apply(this, arguments));
                }

                babelHelpers.createClass(BazaarPage, [{
                    key: "init",
                    value: function init() {
                        app.current = this;

                        this.loading = m.prop(false);
                        this.repository = m.prop(new ExtensionRepository(this.loading));
                        this.repository().loadNextPage();
                        this.connected = app.data.settings['flagrow.bazaar.connected'] == 1 || false;
                        this.flagrowHost = app.data.settings['flagrow.bazaar.flagrow-host'] || 'https://flagrow.io';
                    }
                }, {
                    key: "view",
                    value: function view() {
                        return m('div', { className: 'ExtensionsPage Bazaar' }, [m('div', { className: 'ExtensionsPage-header' }, [m('div', { className: 'container' }, this.header())]), m('div', { className: 'ExtensionsPage-list' }, [m('div', { className: 'container' }, [this.search(), this.items()])]), BazaarLoader.component({ loading: this.loading })]);
                    }
                }, {
                    key: "search",
                    value: function search() {
                        var _this2 = this;

                        return m('fieldset.ExtensionSearch', [m('input[type=text].FormControl', {
                            value: this.repository().searchTerm(),
                            onchange: m.withAttr('value', function (term) {
                                _this2.repository().search(term);
                            }),
                            placeholder: app.translator.trans('flagrow-bazaar.admin.search.placeholder')
                        }), CustomCheckbox.component({
                            iconChecked: 'toggle-up',
                            state: this.repository().filterUpdateRequired(),
                            onchange: function onchange(checked) {
                                return _this2.repository().filterUpdateRequired(checked);
                            },
                            children: app.translator.trans('flagrow-bazaar.admin.search.filter_update_required')
                        }), CustomCheckbox.component({
                            iconChecked: 'plus-square',
                            state: this.repository().filterInstalled(),
                            onchange: function onchange(checked) {
                                return _this2.repository().filterInstalled(checked);
                            },
                            children: app.translator.trans('flagrow-bazaar.admin.search.filter_installed')
                        }), this.connected ? CustomCheckbox.component({
                            iconChecked: 'heart',
                            state: this.repository().filterFavorited(),
                            onchange: function onchange(checked) {
                                return _this2.repository().filterFavorited(checked);
                            },
                            children: app.translator.trans('flagrow-bazaar.admin.search.filter_favorites')
                        }) : '']);
                    }
                }, {
                    key: "items",
                    value: function items() {
                        var _this3 = this;

                        return m('ul', { className: 'ExtensionList' }, [this.repository().extensions().filter(function (extension) {
                            if (_this3.repository().filterInstalled() && !extension.installed()) {
                                return false;
                            }

                            if (_this3.repository().filterUpdateRequired() && !extension.outdated()) {
                                return false;
                            }

                            if (_this3.repository().filterFavorited() && !extension.favorited()) {
                                return false;
                            }

                            return true;
                        }).map(function (extension) {
                            return ExtensionListItem.component({
                                extension: extension,
                                repository: _this3.repository,
                                connected: _this3.connected
                            });
                        })]);
                    }
                }, {
                    key: "header",
                    value: function header() {
                        var buttons = [].concat(this.requirementsButtons(), this.connectedButtons());

                        return m('div', { className: 'ButtonGroup' }, buttons);
                    }
                }, {
                    key: "requirementsButtons",
                    value: function requirementsButtons() {
                        var memory_limit_met = app.data.settings['flagrow.bazaar.php.memory_limit-met'] || false;
                        var memory_limit = app.data.settings['flagrow.bazaar.php.memory_limit'];
                        var memory_requested = app.data.settings['flagrow.bazaar.php.memory_requested'];
                        var file_permissions = app.data.settings['flagrow.bazaar.file-permissions'] || [];

                        var components = [];

                        if (!memory_limit_met) {
                            components.push(Button.component({
                                className: 'Button Button--icon Requirement-MemoryLimit',
                                icon: 'signal',
                                onclick: function onclick() {
                                    return app.modal.show(new MemoryLimitModal({ memory_requested: memory_requested, memory_limit: memory_limit }));
                                }
                            }));
                        }

                        if (file_permissions.length > 0) {
                            components.push(Button.component({
                                className: 'Button Button--icon Requirement-FilePermissions',
                                icon: 'hdd-o',
                                onclick: function onclick() {
                                    return app.modal.show(new FilePermissionsModal({ file_permissions: file_permissions }));
                                }
                            }));
                        }

                        return components;
                    }
                }, {
                    key: "connectedButtons",
                    value: function connectedButtons() {
                        var _this4 = this;

                        if (this.connected) {
                            return [Button.component({
                                className: 'Button Button--icon Connected',
                                icon: 'dashboard',
                                onclick: function onclick() {
                                    return window.open(_this4.flagrowHost + '/home');
                                }
                            })];
                        }

                        return [Button.component({
                            className: 'Button Button--icon Connect',
                            icon: 'plug',
                            onclick: function onclick() {
                                return app.modal.show(new BazaarConnectModal({ flagrowHost: _this4.flagrowHost }));
                            }
                        })];
                    }
                }]);
                return BazaarPage;
            }(Component);

            _export("default", BazaarPage);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/components/CustomCheckbox', ['flarum/components/Checkbox', 'flarum/components/LoadingIndicator', 'flarum/helpers/icon'], function (_export, _context) {
    "use strict";

    var Checkbox, LoadingIndicator, icon, CustomCheckbox;
    return {
        setters: [function (_flarumComponentsCheckbox) {
            Checkbox = _flarumComponentsCheckbox.default;
        }, function (_flarumComponentsLoadingIndicator) {
            LoadingIndicator = _flarumComponentsLoadingIndicator.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }],
        execute: function () {
            CustomCheckbox = function (_Checkbox) {
                babelHelpers.inherits(CustomCheckbox, _Checkbox);

                function CustomCheckbox() {
                    babelHelpers.classCallCheck(this, CustomCheckbox);
                    return babelHelpers.possibleConstructorReturn(this, (CustomCheckbox.__proto__ || Object.getPrototypeOf(CustomCheckbox)).apply(this, arguments));
                }

                babelHelpers.createClass(CustomCheckbox, [{
                    key: 'getDisplay',
                    value: function getDisplay() {
                        var iconChecked = this.props.iconChecked || 'check';
                        var iconUnchecked = this.props.iconUnchecked || 'times';

                        return this.loading ? LoadingIndicator.component({ size: 'tiny' }) : icon(this.props.state ? iconChecked : iconUnchecked);
                    }
                }]);
                return CustomCheckbox;
            }(Checkbox);

            _export('default', CustomCheckbox);
        }
    };
});;
"use strict";

System.register("flagrow/bazaar/components/ExtensionListItem", ["flarum/Component", "flarum/helpers/icon", "flarum/utils/ItemList", "flarum/components/Button", "flarum/components/Dropdown", "flarum/components/Badge"], function (_export, _context) {
    "use strict";

    var Component, icon, ItemList, Button, Dropdown, Badge, ExtensionListItem;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsDropdown) {
            Dropdown = _flarumComponentsDropdown.default;
        }, function (_flarumComponentsBadge) {
            Badge = _flarumComponentsBadge.default;
        }],
        execute: function () {
            ExtensionListItem = function (_Component) {
                babelHelpers.inherits(ExtensionListItem, _Component);

                function ExtensionListItem() {
                    babelHelpers.classCallCheck(this, ExtensionListItem);
                    return babelHelpers.possibleConstructorReturn(this, (ExtensionListItem.__proto__ || Object.getPrototypeOf(ExtensionListItem)).apply(this, arguments));
                }

                babelHelpers.createClass(ExtensionListItem, [{
                    key: "config",
                    value: function config(isInitialized) {
                        if (isInitialized) return;

                        if (this.props.extension.description()) this.$('.ExtensionIcon').tooltip({ container: 'body' });
                    }
                }, {
                    key: "view",
                    value: function view() {
                        var extension = this.props.extension;
                        var connected = this.props.connected || false;
                        var controls = this.controlItems(extension, connected).toArray();
                        var badges = this.badges(extension).toArray();

                        return m(
                            "li",
                            { className: 'ExtensionListItem ' + (extension.enabled() ? 'enabled ' : 'disabled ') + (extension.installed() ? 'installed ' : 'uninstalled ') + (extension.outdated() ? 'outdated ' : '') },
                            m(
                                "div",
                                { className: "ExtensionListItem-content" },
                                m(
                                    "span",
                                    { className: "ExtensionListItem-icon ExtensionIcon", style: extension.icon() || '', title: extension.description() },
                                    extension.icon() ? icon(extension.icon().name) : ''
                                ),
                                m(
                                    "ul",
                                    { className: "ExtensionListItem-badges badges" },
                                    badges
                                ),
                                controls.length ? m(
                                    Dropdown,
                                    {
                                        className: "ExtensionListItem-controls",
                                        buttonClassName: "Button Button--icon Button--flat",
                                        menuClassName: "Dropdown-menu--right",
                                        icon: "ellipsis-h" },
                                    controls
                                ) : '',
                                m(
                                    "label",
                                    { className: "ExtensionListItem-title" },
                                    extension.title() || extension.package()
                                ),
                                m(
                                    "label",
                                    { className: "ExtensionListItem-vendor" },
                                    app.translator.trans('flagrow-bazaar.admin.page.extension.vendor', {
                                        vendor: extension.package().split('/')[0]
                                    })
                                ),
                                m(
                                    "div",
                                    { className: "ExtensionListItem-version" },
                                    extension.installed_version() || extension.highest_version()
                                )
                            )
                        );
                    }
                }, {
                    key: "controlItems",
                    value: function controlItems(extension, connected) {
                        var items = new ItemList();
                        var repository = this.props.repository;
                        var favoriteTrans = extension.favorited() ? 'flagrow-bazaar.admin.page.button.remove_favorite_button' : 'flagrow-bazaar.admin.page.button.favorite_button';

                        if (connected) {
                            items.add('favorite', Button.component({
                                icon: 'heart',
                                children: app.translator.trans(favoriteTrans),
                                onclick: function onclick() {
                                    repository().favoriteExtension(extension);
                                }
                            }));
                        }

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
                                onclick: function onclick() {
                                    repository().uninstallExtension(extension);
                                }
                            }));
                            items.add('enable', Button.component({
                                icon: 'check-square-o',
                                children: app.translator.trans('flagrow-bazaar.admin.page.button.enable'),
                                onclick: function onclick() {
                                    repository().enableExtension(extension);
                                }
                            }));
                        }

                        if (extension.installed() && extension.outdated()) {
                            items.add('update', Button.component({
                                icon: 'toggle-up',
                                children: app.translator.trans('flagrow-bazaar.admin.page.button.update'),
                                onclick: function onclick() {
                                    repository().updateExtension(extension);
                                }
                            }));
                        }

                        if (extension.installed() && extension.enabled()) {
                            items.add('disable', Button.component({
                                icon: 'square-o',
                                children: app.translator.trans('flagrow-bazaar.admin.page.button.disable'),
                                onclick: function onclick() {
                                    repository().disableExtension(extension);
                                }
                            }));
                        }

                        if (!extension.installed()) {
                            items.add('install', Button.component({
                                icon: 'plus-square-o',
                                children: app.translator.trans('flagrow-bazaar.admin.page.button.install'),
                                onclick: function onclick() {
                                    repository().installExtension(extension);
                                }
                            }));
                        }

                        return items;
                    }
                }, {
                    key: "badges",
                    value: function badges(extension) {
                        var items = new ItemList();

                        if (extension.installed() && extension.outdated()) {
                            items.add('favorited', m(Badge, { icon: "warning", type: "outdated",
                                label: app.translator.trans('flagrow-bazaar.admin.page.extension.outdated', { new: extension.highest_version() }) }));
                        }

                        if (extension.favorited()) {
                            items.add('favorited', m(Badge, { icon: "heart", type: "favorited",
                                label: app.translator.trans('flagrow-bazaar.admin.page.extension.favorited') }));
                        }

                        if (extension.installed() && !extension.enabled()) {
                            items.add('installed', m(Badge, { icon: "plus-square", type: "installed",
                                label: app.translator.trans('flagrow-bazaar.admin.page.extension.installed') }));
                        }
                        if (extension.enabled()) {
                            items.add('enabled', m(Badge, { icon: "check-square", type: "enabled",
                                label: app.translator.trans('flagrow-bazaar.admin.page.extension.enabled') }));
                        }

                        return items;
                    }
                }]);
                return ExtensionListItem;
            }(Component);

            _export("default", ExtensionListItem);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/main', ['flarum/extend', 'flarum/app', 'flagrow/bazaar/modals/BazaarSettingsModal', 'flagrow/bazaar/models/Extension', 'flagrow/bazaar/addBazaarPage'], function (_export, _context) {
    "use strict";

    var extend, app, BazaarSettingsModal, Extension, addBazaarPage;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowBazaarModalsBazaarSettingsModal) {
            BazaarSettingsModal = _flagrowBazaarModalsBazaarSettingsModal.default;
        }, function (_flagrowBazaarModelsExtension) {
            Extension = _flagrowBazaarModelsExtension.default;
        }, function (_flagrowBazaarAddBazaarPage) {
            addBazaarPage = _flagrowBazaarAddBazaarPage.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-bazaar', function (app) {
                app.extensionSettings['flagrow-bazaar'] = function () {
                    return app.modal.show(new BazaarSettingsModal());
                };
                app.store.models['bazaar-extensions'] = Extension;

                addBazaarPage();
            });
        }
    };
});;
"use strict";

System.register("flagrow/bazaar/modals/BazaarConnectModal", ["flarum/components/Modal", "flarum/components/Button"], function (_export, _context) {
    "use strict";

    var Modal, Button, BazaarConnectModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }],
        execute: function () {
            BazaarConnectModal = function (_Modal) {
                babelHelpers.inherits(BazaarConnectModal, _Modal);

                function BazaarConnectModal() {
                    babelHelpers.classCallCheck(this, BazaarConnectModal);
                    return babelHelpers.possibleConstructorReturn(this, (BazaarConnectModal.__proto__ || Object.getPrototypeOf(BazaarConnectModal)).apply(this, arguments));
                }

                babelHelpers.createClass(BazaarConnectModal, [{
                    key: "className",
                    value: function className() {
                        return 'FilePermissionsModal';
                    }
                }, {
                    key: "title",
                    value: function title() {
                        return app.translator.trans('flagrow-bazaar.admin.modal.connect-bazaar.title');
                    }
                }, {
                    key: "content",
                    value: function content() {
                        var flagrowHost = this.props.flagrowHost;

                        return m('div', { className: 'Modal-body' }, [m('p', app.translator.trans('flagrow-bazaar.admin.modal.connect-bazaar.description', { host: flagrowHost })), m('div', { className: "App-primaryControl" }, [Button.component({
                            type: 'submit',
                            className: 'Button Button--primary Button--block',
                            disabled: false,
                            icon: 'check',
                            children: app.translator.trans('flagrow-bazaar.admin.page.button.connect')
                        })])]);
                    }
                }, {
                    key: "connect",
                    value: function connect() {
                        var popup = window.open();

                        app.request({
                            method: 'GET',
                            url: app.forum.attribute('apiUrl') + '/bazaar/connect'
                        }).then(function (response) {
                            if (response && response.redirect) {
                                popup.location = response.redirect;
                            } else {
                                popup.close();
                            }
                        });
                    }
                }, {
                    key: "onsubmit",
                    value: function onsubmit() {
                        this.connect();
                    }
                }]);
                return BazaarConnectModal;
            }(Modal);

            _export("default", BazaarConnectModal);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/modals/BazaarSettingsModal', ['flarum/app', 'flarum/components/SettingsModal'], function (_export, _context) {
    "use strict";

    var app, SettingsModal, BazaarSettingsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal.default;
        }],
        execute: function () {
            BazaarSettingsModal = function (_SettingsModal) {
                babelHelpers.inherits(BazaarSettingsModal, _SettingsModal);

                function BazaarSettingsModal() {
                    babelHelpers.classCallCheck(this, BazaarSettingsModal);
                    return babelHelpers.possibleConstructorReturn(this, (BazaarSettingsModal.__proto__ || Object.getPrototypeOf(BazaarSettingsModal)).apply(this, arguments));
                }

                babelHelpers.createClass(BazaarSettingsModal, [{
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('flagrow-bazaar.admin.modal.settings.title');
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m('div', { className: 'Form-group' }, [m('label', { for: 'bazaar-api-token' }, app.translator.trans('flagrow-bazaar.admin.modal.settings.field.apiToken')), m('input', {
                            id: 'bazaar-api-token',
                            className: 'FormControl',
                            bidi: this.setting('flagrow.bazaar.api_token')
                        }), m('span', app.translator.trans('flagrow-bazaar.admin.modal.settings.field.apiTokenDescription'))])];
                    }
                }]);
                return BazaarSettingsModal;
            }(SettingsModal);

            _export('default', BazaarSettingsModal);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/modals/FilePermissionsModal', ['flarum/components/Modal'], function (_export, _context) {
    "use strict";

    var Modal, FilePermissionsModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }],
        execute: function () {
            FilePermissionsModal = function (_Modal) {
                babelHelpers.inherits(FilePermissionsModal, _Modal);

                function FilePermissionsModal() {
                    babelHelpers.classCallCheck(this, FilePermissionsModal);
                    return babelHelpers.possibleConstructorReturn(this, (FilePermissionsModal.__proto__ || Object.getPrototypeOf(FilePermissionsModal)).apply(this, arguments));
                }

                babelHelpers.createClass(FilePermissionsModal, [{
                    key: 'className',
                    value: function className() {
                        return 'FilePermissionsModal';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('flagrow-bazaar.admin.modal.requirements.file-permissions.title');
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        var permissions = this.props.file_permissions;
                        var paths = [];

                        permissions.forEach(function (path) {
                            paths.push(m('li', m('span', { className: 'code' }, path)));
                        });

                        return m('div', { className: 'Modal-body' }, [m('p', app.translator.trans('flagrow-bazaar.admin.modal.requirements.file-permissions.description', { a: m('a', { href: 'https://github.com/flagrow/bazaar/wiki/File-permissions', target: '_blank' }) })), m('ul', paths)]);
                    }
                }]);
                return FilePermissionsModal;
            }(Modal);

            _export('default', FilePermissionsModal);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/modals/MemoryLimitModal', ['flarum/components/Modal'], function (_export, _context) {
    "use strict";

    var Modal, MemoryLimitModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }],
        execute: function () {
            MemoryLimitModal = function (_Modal) {
                babelHelpers.inherits(MemoryLimitModal, _Modal);

                function MemoryLimitModal() {
                    babelHelpers.classCallCheck(this, MemoryLimitModal);
                    return babelHelpers.possibleConstructorReturn(this, (MemoryLimitModal.__proto__ || Object.getPrototypeOf(MemoryLimitModal)).apply(this, arguments));
                }

                babelHelpers.createClass(MemoryLimitModal, [{
                    key: 'className',
                    value: function className() {
                        return 'MemoryLimitModal';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('flagrow-bazaar.admin.modal.requirements.php-memory_limit.title');
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        var memory_requested = this.props.memory_requested;
                        var memory_limit = this.props.memory_limit;

                        return m('div', { className: 'Modal-body' }, app.translator.trans('flagrow-bazaar.admin.modal.requirements.php-memory_limit.description', {
                            required: memory_requested,
                            limit: memory_limit,
                            a: m('a', { href: 'https://github.com/flagrow/bazaar/wiki/PHP-memory-limit', target: '_blank' })
                        }));
                    }
                }]);
                return MemoryLimitModal;
            }(Modal);

            _export('default', MemoryLimitModal);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/models/Extension', ['flarum/Model', 'flarum/utils/mixin', 'flarum/utils/computed'], function (_export, _context) {
    "use strict";

    var Model, mixin, computed, Extension;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }, function (_flarumUtilsComputed) {
            computed = _flarumUtilsComputed.default;
        }],
        execute: function () {
            Extension = function (_mixin) {
                babelHelpers.inherits(Extension, _mixin);

                function Extension() {
                    babelHelpers.classCallCheck(this, Extension);
                    return babelHelpers.possibleConstructorReturn(this, (Extension.__proto__ || Object.getPrototypeOf(Extension)).apply(this, arguments));
                }

                return Extension;
            }(mixin(Model, {
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

                can_install: computed('installed', function (installed) {
                    return !installed;
                }),
                can_uninstall: computed('installed', 'enabled', function (installed, enabled) {
                    return installed && !enabled;
                }),

                favorited: Model.attribute('favorited')
            }));

            _export('default', Extension);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/utils/ExtensionRepository', ['flarum/app'], function (_export, _context) {
    "use strict";

    var app, ExtensionRepository;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }],
        execute: function () {
            ExtensionRepository = function () {
                function ExtensionRepository(loading) {
                    babelHelpers.classCallCheck(this, ExtensionRepository);

                    this.extensions = m.prop([]);
                    this.nextPageUrl = null;
                    this.loading = loading;
                    this.resetNavigation();
                    this.searchTerm = m.prop('');
                    this.filterInstalled = m.prop(false);
                    this.filterUpdateRequired = m.prop(false);
                    this.filterFavorited = m.prop(false);
                }

                /**
                 * Loads next page or resets based on nextPageUrl.
                 */


                babelHelpers.createClass(ExtensionRepository, [{
                    key: 'loadNextPage',
                    value: function loadNextPage() {
                        var _this = this;

                        if (this.loading() || !this.nextPageUrl) {
                            return;
                        }

                        this.loading(true);

                        var data = {
                            filter: {}
                        };

                        if (this.searchTerm()) {
                            data.filter = {
                                search: this.searchTerm()
                            };
                        }

                        app.request({
                            method: 'GET',
                            url: this.nextPageUrl,
                            data: data
                        }).then(function (result) {
                            var newExtensions = result.data.map(function (data) {
                                return app.store.createRecord('bazaar-extensions', data);
                            });
                            // start/end computation is required for the admin UI to refresh after the new extensions have been loaded
                            // this.extensions(this.extensions().concat(newExtensions));
                            _this.extensions(newExtensions);
                            _this.nextPageUrl = result.links.next;
                            _this.loading(false);

                            m.redraw();
                        });
                    }
                }, {
                    key: 'resetNavigation',
                    value: function resetNavigation() {
                        this.loading(false); // Might cause problems if an update is in process
                        this.nextPageUrl = app.forum.attribute('apiUrl') + '/bazaar/extensions';
                        this.extensions([]);
                    }
                }, {
                    key: 'installExtension',
                    value: function installExtension(extension) {
                        var _this2 = this;

                        this.loading(true);

                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions',
                            timeout: 0,
                            data: {
                                id: extension.id()
                            }
                        }).then(function (response) {
                            _this2.updateExtensionInRepository(response);
                        });
                    }
                }, {
                    key: 'installFailure',
                    value: function installFailure(extension) {
                        this.resetNavigation();
                        this.loadNextPage();
                    }
                }, {
                    key: 'uninstallExtension',
                    value: function uninstallExtension(extension) {
                        var _this3 = this;

                        this.loading(true);

                        app.request({
                            method: 'DELETE',
                            timeout: 0,
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id()
                        }).then(function (response) {
                            _this3.updateExtensionInRepository(response);
                        });
                    }
                }, {
                    key: 'uninstallFailure',
                    value: function uninstallFailure(extension) {
                        this.resetNavigation();
                        this.loadNextPage();
                    }
                }, {
                    key: 'favoriteExtension',
                    value: function favoriteExtension(extension) {
                        var _this4 = this;

                        this.loading(true);

                        app.request({
                            method: 'post',
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id() + '/favorite',
                            data: {
                                favorite: extension.favorited() != true
                            }
                        }).then(function (response) {
                            _this4.updateExtensionInRepository(response);
                        });
                    }
                }, {
                    key: 'updateExtension',
                    value: function updateExtension(extension) {
                        var _this5 = this;

                        this.loading(true);

                        app.request({
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id(),
                            timeout: 0,
                            method: 'PATCH'
                        }).then(function (response) {
                            _this5.updateExtensionInRepository(response);
                        }).then(function () {
                            location.reload();
                        });
                    }
                }, {
                    key: 'toggleExtension',
                    value: function toggleExtension(extension) {
                        var _this6 = this;

                        this.loading(true);

                        var enabled = extension.enabled();

                        app.request({
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id() + '/toggle',
                            method: 'PATCH',
                            data: { enabled: !enabled }
                        }).then(function (response) {
                            _this6.updateExtensionInRepository(response);
                        });
                    }
                }, {
                    key: 'disableExtension',
                    value: function disableExtension(extension) {
                        this.toggleExtension(extension);
                    }
                }, {
                    key: 'enableExtension',
                    value: function enableExtension(extension) {
                        this.toggleExtension(extension);
                    }
                }, {
                    key: 'getExtensionIndex',
                    value: function getExtensionIndex(extension) {
                        return this.extensions().findIndex(function (ext) {
                            return ext.id() == extension.id();
                        });
                    }
                }, {
                    key: 'updateExtensionInRepository',
                    value: function updateExtensionInRepository(response) {
                        this.loading(false);

                        var extension = app.store.createRecord('bazaar-extensions', response.data);
                        this.extensions()[this.getExtensionIndex(extension)] = extension;
                        m.redraw();
                    }
                }, {
                    key: 'search',
                    value: function search(term) {
                        this.searchTerm(term);
                        this.resetNavigation();
                        this.loadNextPage();
                    }
                }]);
                return ExtensionRepository;
            }();

            _export('default', ExtensionRepository);
        }
    };
});