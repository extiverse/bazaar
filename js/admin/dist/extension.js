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

System.register('flagrow/bazaar/components/BazaarPage', ['flarum/Component', 'flarum/components/Button', 'flagrow/bazaar/utils/ExtensionRepository'], function (_export, _context) {
    "use strict";

    var Component, Button, ExtensionRepository, BazaarPage;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowBazaarUtilsExtensionRepository) {
            ExtensionRepository = _flagrowBazaarUtilsExtensionRepository.default;
        }],
        execute: function () {
            BazaarPage = function (_Component) {
                babelHelpers.inherits(BazaarPage, _Component);

                function BazaarPage() {
                    babelHelpers.classCallCheck(this, BazaarPage);
                    return babelHelpers.possibleConstructorReturn(this, (BazaarPage.__proto__ || Object.getPrototypeOf(BazaarPage)).apply(this, arguments));
                }

                babelHelpers.createClass(BazaarPage, [{
                    key: 'init',
                    value: function init() {
                        this.repository = new ExtensionRepository();
                        this.repository.loadNextPage();
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        return m('ul', [this.repository.extensions().map(function (extension) {
                            return m('li', [extension.package(), extension.can_install() ? Button.component({
                                type: 'button',
                                className: 'Button',
                                children: app.translator.trans('flagrow-bazaar.admin.page.button.install'),
                                onclick: function onclick() {
                                    _this2.repository.installExtension(extension);
                                }
                            }) : '', extension.can_uninstall() ? Button.component({
                                type: 'button',
                                className: 'Button',
                                children: app.translator.trans('flagrow-bazaar.admin.page.button.uninstall'),
                                onclick: function onclick() {
                                    _this2.repository.uninstallExtension(extension);
                                }
                            }) : '']);
                        }), m('li', Button.component({
                            type: 'button',
                            className: 'Button',
                            children: 'More',
                            onclick: function onclick() {
                                _this2.repository.loadNextPage();
                            }
                        }))]);
                    }
                }]);
                return BazaarPage;
            }(Component);

            _export('default', BazaarPage);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/components/BazaarSettingsModal', ['flarum/app', 'flarum/components/SettingsModal'], function (_export, _context) {
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
                        return app.translator.trans('flagrow-bazaar.admin.popup.title');
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m('div', { className: 'Form-group' }, [m('label', { for: 'bazaar-api-token' }, app.translator.trans('flagrow-bazaar.admin.popup.field.apiToken')), m('input', {
                            id: 'bazaar-api-token',
                            className: 'FormControl',
                            bidi: this.setting('flagrow.bazaar.api_token')
                        })])];
                    }
                }]);
                return BazaarSettingsModal;
            }(SettingsModal);

            _export('default', BazaarSettingsModal);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/main', ['flarum/extend', 'flarum/app', 'flagrow/bazaar/components/BazaarSettingsModal', 'flagrow/bazaar/models/Extension', 'flagrow/bazaar/addBazaarPage'], function (_export, _context) {
    "use strict";

    var extend, app, BazaarSettingsModal, Extension, addBazaarPage;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowBazaarComponentsBazaarSettingsModal) {
            BazaarSettingsModal = _flagrowBazaarComponentsBazaarSettingsModal.default;
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

                stars: Model.attribute('stars'),
                forks: Model.attribute('forks'),
                downloads: Model.attribute('downloads'),

                installed: Model.attribute('installed'),
                enabled: Model.attribute('enabled'),
                installed_version: Model.attribute('installed_version'),

                can_install: computed('installed', function (installed) {
                    return !installed;
                }),
                can_uninstall: computed('installed', 'enabled', function (installed, enabled) {
                    return installed && !enabled;
                })
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
                function ExtensionRepository() {
                    babelHelpers.classCallCheck(this, ExtensionRepository);

                    this.extensions = m.prop([]);
                    this.nextPageUrl = null;
                    this.loading = false;
                    this.resetNavigation();
                }

                babelHelpers.createClass(ExtensionRepository, [{
                    key: 'loadNextPage',
                    value: function loadNextPage() {
                        var _this = this;

                        if (this.loading || !this.nextPageUrl) {
                            return;
                        }

                        this.loading = true;
                        app.request({
                            method: 'GET',
                            url: this.nextPageUrl
                        }).then(function (result) {
                            console.log(result);
                            var newExtensions = result.data.map(function (data) {
                                return app.store.createRecord('bazaar-extensions', data);
                            });
                            // start/end computation is required for the admin UI to refresh after the new extensions have been loaded
                            m.startComputation();
                            _this.extensions(_this.extensions().concat(newExtensions));
                            m.endComputation();
                            console.log(newExtensions);

                            _this.nextPageUrl = result.links.next;
                            _this.loading = false;
                        });
                    }
                }, {
                    key: 'resetNavigation',
                    value: function resetNavigation() {
                        this.loading = false; // Might cause problems if an update is in process
                        this.nextPageUrl = app.forum.attribute('apiUrl') + '/bazaar/extensions';
                        this.extensions([]);
                    }
                }, {
                    key: 'installExtension',
                    value: function installExtension(extension) {
                        var _this2 = this;

                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions',
                            data: {
                                id: extension.id()
                            }
                        }).then(function () {
                            m.startComputation();
                            _this2.resetNavigation();
                            m.endComputation();
                        });
                    }
                }, {
                    key: 'uninstallExtension',
                    value: function uninstallExtension(extension) {
                        var _this3 = this;

                        app.request({
                            method: 'DELETE',
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/:id',
                            data: {
                                id: extension.id()
                            }
                        }).then(function () {
                            m.startComputation();
                            _this3.resetNavigation();
                            m.endComputation();
                        });
                    }
                }]);
                return ExtensionRepository;
            }();

            _export('default', ExtensionRepository);
        }
    };
});