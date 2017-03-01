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
                children: 'Bazaar',
                description: app.translator.trans('flagrow-upload.admin.help_texts.description')
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

System.register('flagrow/bazaar/components/BazaarPage', ['flarum/Component', './ExtensionRepository'], function (_export, _context) {
    "use strict";

    var Component, ExtensionRepository, BazaarPage;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_ExtensionRepository) {
            ExtensionRepository = _ExtensionRepository.default;
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
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        return m('ul', [this.repository.extensions().map(function (extension) {
                            return m('li', extension.package());
                        }), m('li', m('button', { onclick: function onclick() {
                                _this2.repository.loadNextPage();
                            } }, 'More'))]);
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

System.register('flagrow/bazaar/components/ExtensionRepository', ['flarum/app'], function (_export, _context) {
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
                    this.currentPage = 0;
                    this.nextPageUrl = app.forum.attribute('apiUrl') + '/bazaar/extensions';
                    this.loading = false;
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
                }]);
                return ExtensionRepository;
            }();

            _export('default', ExtensionRepository);
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

System.register('flagrow/bazaar/models/Extension', ['flarum/Model', 'flarum/utils/mixin'], function (_export, _context) {
    "use strict";

    var Model, mixin, Extension;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
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
                installed_version: Model.attribute('installed_version')
            }));

            _export('default', Extension);
        }
    };
});