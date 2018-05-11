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
                icon: 'fas fa-shopping-bag',
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

System.register('flagrow/bazaar/addTasksPage', ['flarum/extend', 'flarum/app', 'flagrow/bazaar/components/TasksPage'], function (_export, _context) {
    "use strict";

    var extend, app, TasksPage;

    _export('default', function () {
        app.routes['flagrow-bazaar-tasks'] = { path: '/flagrow/bazaar/tasks', component: TasksPage.component() };
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowBazaarComponentsTasksPage) {
            TasksPage = _flagrowBazaarComponentsTasksPage.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/bazaar/components/BazaarLoader', ['flarum/Component', 'flarum/helpers/icon', 'flarum/components/Button', 'flarum/components/LinkButton'], function (_export, _context) {
    "use strict";

    var Component, icon, Button, LinkButton, BazaarLoader;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsLinkButton) {
            LinkButton = _flarumComponentsLinkButton.default;
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
                        var error = this.props.loading() === 'error';

                        return m('div', {
                            className: 'Bazaar--Loader ' + (error ? 'Error' : null),
                            hidden: this.props.loading() === false
                        }, [m('.Loader-modal', [m('.Loader-icon', icon(error ? 'fas fa-exclamation-triangle' : 'fas fa-shopping-bag')), m('div', [m('p', app.translator.trans(error ? 'flagrow-bazaar.admin.loader.error' : 'flagrow-bazaar.admin.loader.is_loading')), error ? [Button.component({
                            className: 'Button Button--block',
                            icon: 'fas fa-refresh',
                            onclick: function onclick() {
                                return location.reload();
                            },
                            children: app.translator.trans('flagrow-bazaar.admin.loader.refresh')
                        }), LinkButton.component({
                            className: 'Button Button--block',
                            icon: 'fas fa-bug',
                            href: 'https://github.com/flagrow/bazaar/issues',
                            target: '_blank',
                            config: {}, // Disable internal Mithril routing
                            children: app.translator.trans('flagrow-bazaar.admin.loader.report_issue')
                        })] : null])])]);
                    }
                }]);
                return BazaarLoader;
            }(Component);

            _export('default', BazaarLoader);
        }
    };
});;
"use strict";

System.register("flagrow/bazaar/components/BazaarPage", ["flarum/Component", "./../utils/ExtensionRepository", "./ExtensionList", "./ExtensionListItem", "./ExtensionSearch", "./BazaarPageHeader"], function (_export, _context) {
    "use strict";

    var Component, ExtensionRepository, ExtensionList, ExtensionListItem, ExtensionSearch, BazaarPageHeader, BazaarPage;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_utilsExtensionRepository) {
            ExtensionRepository = _utilsExtensionRepository.default;
        }, function (_ExtensionList) {
            ExtensionList = _ExtensionList.default;
        }, function (_ExtensionListItem) {
            ExtensionListItem = _ExtensionListItem.default;
        }, function (_ExtensionSearch) {
            ExtensionSearch = _ExtensionSearch.default;
        }, function (_BazaarPageHeader) {
            BazaarPageHeader = _BazaarPageHeader.default;
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

                        this.authorized = (app.data.settings['flagrow.bazaar.api_token'] || '').length > 0;
                        this.connected = app.data.settings['flagrow.bazaar.connected'] && app.data.settings['flagrow.bazaar.connected'] !== '0';
                        this.loading = m.prop(false);

                        this.params = this.params();

                        this.repository = new ExtensionRepository();
                        this.extensionList = new ExtensionList({
                            params: this.params,
                            loading: this.loading,
                            repository: this.repository,
                            connected: this.connected,
                            authorized: this.authorized
                        });
                        this.search = ExtensionSearch.component({ params: this.params, onsubmit: this.updateResults.bind(this) });
                    }
                }, {
                    key: "updateResults",
                    value: function updateResults(params) {
                        this.params = params;

                        this.extensionList.update(params);
                    }
                }, {
                    key: "view",
                    value: function view() {
                        return m('div', { className: 'ExtensionsPage Bazaar' }, [BazaarPageHeader.component({
                            connected: this.connected
                        }), m('div', { className: 'ExtensionsPage-list' }, [m('div', { className: 'container' }, [this.search, this.extensionList.render()])])]);
                    }
                }, {
                    key: "items",
                    value: function items() {
                        var _this2 = this;

                        return m('ul', { className: 'ExtensionList' }, [this.repository.extensions().map(function (extension) {
                            return ExtensionListItem.component({
                                extension: extension,
                                repository: _this2.repository,
                                connected: _this2.connected,
                                key: extension.package()
                            });
                        })]);
                    }
                }, {
                    key: "stickyParams",
                    value: function stickyParams() {
                        return {
                            sort: m.route.param('sort'),
                            q: m.route.param('q')
                        };
                    }
                }, {
                    key: "params",
                    value: function params() {
                        var params = this.stickyParams();

                        params.filter = m.route.param('filter');

                        return params;
                    }
                }]);
                return BazaarPage;
            }(Component);

            _export("default", BazaarPage);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/components/BazaarPageHeader', ['flarum/app', 'flarum/Component', 'flarum/components/LinkButton', 'flarum/components/Button', './../modals/FilePermissionsModal', './../modals/MemoryLimitModal', './../modals/BazaarConnectModal', './../modals/BazaarSettingsModal', './../modals/DashboardModal'], function (_export, _context) {
    "use strict";

    var app, Component, LinkButton, Button, FilePermissionsModal, MemoryLimitModal, BazaarConnectModal, BazaarSettingsModal, DashboardModal, BazaarPageHeader;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsLinkButton) {
            LinkButton = _flarumComponentsLinkButton.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_modalsFilePermissionsModal) {
            FilePermissionsModal = _modalsFilePermissionsModal.default;
        }, function (_modalsMemoryLimitModal) {
            MemoryLimitModal = _modalsMemoryLimitModal.default;
        }, function (_modalsBazaarConnectModal) {
            BazaarConnectModal = _modalsBazaarConnectModal.default;
        }, function (_modalsBazaarSettingsModal) {
            BazaarSettingsModal = _modalsBazaarSettingsModal.default;
        }, function (_modalsDashboardModal) {
            DashboardModal = _modalsDashboardModal.default;
        }],
        execute: function () {
            BazaarPageHeader = function (_Component) {
                babelHelpers.inherits(BazaarPageHeader, _Component);

                function BazaarPageHeader() {
                    babelHelpers.classCallCheck(this, BazaarPageHeader);
                    return babelHelpers.possibleConstructorReturn(this, (BazaarPageHeader.__proto__ || Object.getPrototypeOf(BazaarPageHeader)).apply(this, arguments));
                }

                babelHelpers.createClass(BazaarPageHeader, [{
                    key: 'view',
                    value: function view() {
                        return m(
                            'div',
                            { className: 'ExtensionsPage-header' },
                            m(
                                'div',
                                { className: 'container' },
                                this.header()
                            )
                        );
                    }
                }, {
                    key: 'header',
                    value: function header() {
                        var buttons = [].concat(this.settingsButton(), this.requirementsButtons(), this.connectedButtons(), this.pagesButtons());

                        return m('div', { className: 'ButtonGroup' }, buttons);
                    }
                }, {
                    key: 'settingsButton',
                    value: function settingsButton() {
                        return [Button.component({
                            className: 'Button Button--icon',
                            icon: 'fas fa-cog',
                            onclick: function onclick() {
                                return app.modal.show(new BazaarSettingsModal());
                            }
                        })];
                    }
                }, {
                    key: 'requirementsButtons',
                    value: function requirementsButtons() {
                        var memory_limit_met = app.data.settings['flagrow.bazaar.php.memory_limit-met'] || false;
                        var memory_limit = app.data.settings['flagrow.bazaar.php.memory_limit'];
                        var memory_requested = app.data.settings['flagrow.bazaar.php.memory_requested'];
                        var file_permissions = app.data.settings['flagrow.bazaar.file-permissions'] || [];

                        var components = [];

                        if (!memory_limit_met) {
                            components.push(Button.component({
                                className: 'Button Button--icon Requirement-MemoryLimit',
                                icon: 'fas fa-signal',
                                onclick: function onclick() {
                                    return app.modal.show(new MemoryLimitModal({ memory_requested: memory_requested, memory_limit: memory_limit }));
                                }
                            }));
                        }

                        if (file_permissions.length > 0) {
                            components.push(Button.component({
                                className: 'Button Button--icon Requirement-FilePermissions',
                                icon: 'fas fa-hdd',
                                onclick: function onclick() {
                                    return app.modal.show(new FilePermissionsModal({ file_permissions: file_permissions }));
                                }
                            }));
                        }

                        return components;
                    }
                }, {
                    key: 'connectedButtons',
                    value: function connectedButtons() {
                        var connected = this.props.connected;
                        var flagrowHost = app.data.settings['flagrow.bazaar.flagrow-host'] || 'https://flagrow.io';

                        if (connected) {
                            return [Button.component({
                                className: 'Button Button--icon Connected',
                                icon: 'fas fa-dashboard',
                                onclick: function onclick() {
                                    return app.modal.show(new DashboardModal({
                                        flagrowHost: flagrowHost
                                    }));
                                }
                            })];
                        }

                        return [Button.component({
                            className: 'Button Button--icon Connect',
                            icon: 'fas fa-plug',
                            onclick: function onclick() {
                                return app.modal.show(new BazaarConnectModal({ flagrowHost: flagrowHost }));
                            }
                        })];
                    }
                }, {
                    key: 'pagesButtons',
                    value: function pagesButtons() {
                        // Sometimes no route has been set as the current one
                        if (typeof app.current === 'undefined') {
                            return null;
                        }

                        var routeName = app.current.props.routeName;
                        var links = [];

                        if (routeName !== 'flagrow-bazaar') {
                            links.push(LinkButton.component({
                                className: 'Button Button--icon',
                                icon: 'fas fa-shopping-bag',
                                href: app.route('flagrow-bazaar'),
                                title: app.translator.trans('flagrow-bazaar.admin.header.extensions')
                            }));
                        }

                        if (routeName !== 'flagrow-bazaar-tasks') {
                            links.push(LinkButton.component({
                                className: 'Button Button--icon',
                                icon: 'fas fa-history',
                                href: app.route('flagrow-bazaar-tasks'),
                                title: app.translator.trans('flagrow-bazaar.admin.header.tasks')
                            }));
                        }

                        return links;
                    }
                }]);
                return BazaarPageHeader;
            }(Component);

            _export('default', BazaarPageHeader);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/components/CustomCheckbox', ['flarum/components/Button', 'flarum/helpers/icon', 'flarum/utils/extract', 'flarum/utils/extractText'], function (_export, _context) {
    "use strict";

    var Button, icon, extract, extractText, CustomCheckbox;
    return {
        setters: [function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumUtilsExtract) {
            extract = _flarumUtilsExtract.default;
        }, function (_flarumUtilsExtractText) {
            extractText = _flarumUtilsExtractText.default;
        }],
        execute: function () {
            CustomCheckbox = function (_Button) {
                babelHelpers.inherits(CustomCheckbox, _Button);

                function CustomCheckbox() {
                    babelHelpers.classCallCheck(this, CustomCheckbox);
                    return babelHelpers.possibleConstructorReturn(this, (CustomCheckbox.__proto__ || Object.getPrototypeOf(CustomCheckbox)).apply(this, arguments));
                }

                babelHelpers.createClass(CustomCheckbox, [{
                    key: 'view',
                    value: function view() {
                        var attrs = babelHelpers.extends({}, this.props);

                        delete attrs.state;
                        delete attrs.children;

                        attrs.className = attrs.className || '';
                        attrs.type = attrs.type || 'button';

                        if (this.props.state) attrs.className += ' active';

                        // If nothing else is provided, we use the textual button content as tooltip
                        if (!attrs.title && this.props.children) {
                            attrs.title = extractText(this.props.children);
                        }

                        var iconName = extract(attrs, 'icon');
                        if (iconName) attrs.className += ' hasIcon';

                        var loading = extract(attrs, 'loading');
                        if (attrs.disabled || loading) {
                            attrs.className += ' disabled' + (loading ? ' loading' : '');
                            delete attrs.onclick;
                        }

                        return m(
                            'button',
                            babelHelpers.extends({}, attrs, {
                                onclick: this.onchange.bind(this)
                            }),
                            this.getButtonContent()
                        );
                    }
                }, {
                    key: 'onchange',
                    value: function onchange() {
                        if (this.props.onchange) this.props.onchange(!this.props.state, this);
                    }
                }]);
                return CustomCheckbox;
            }(Button);

            _export('default', CustomCheckbox);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/components/ExtensionList', ['flarum/Component', 'flarum/components/Button', './ExtensionListItem', './BazaarLoader', 'flarum/components/Placeholder'], function (_export, _context) {
    "use strict";

    var Component, Button, ExtensionListItem, BazaarLoader, Placeholder, ExtensionList;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_ExtensionListItem) {
            ExtensionListItem = _ExtensionListItem.default;
        }, function (_BazaarLoader) {
            BazaarLoader = _BazaarLoader.default;
        }, function (_flarumComponentsPlaceholder) {
            Placeholder = _flarumComponentsPlaceholder.default;
        }],
        execute: function () {
            ExtensionList = function (_Component) {
                babelHelpers.inherits(ExtensionList, _Component);

                function ExtensionList() {
                    babelHelpers.classCallCheck(this, ExtensionList);
                    return babelHelpers.possibleConstructorReturn(this, (ExtensionList.__proto__ || Object.getPrototypeOf(ExtensionList)).apply(this, arguments));
                }

                babelHelpers.createClass(ExtensionList, [{
                    key: 'init',
                    value: function init() {
                        /**
                         * Whether or not discussion results are loading.
                         *
                         * @type {Boolean}
                         */
                        this.loading = this.props.loading();

                        /**
                         * Whether or not there are more results that can be loaded.
                         *
                         * @type {Boolean}
                         */
                        this.moreResults = false;

                        // this.repository = new ExtensionRepository(this.loading);

                        /**
                         * The discussions in the discussion list.
                         *
                         * @type {Extension[]}
                         */
                        this.extensions = [];

                        this.refresh();
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        var loading = void 0;

                        if (this.loading) {
                            loading = BazaarLoader.component({ loading: this.props.loading });
                        } else if (this.moreResults) {
                            loading = Button.component({
                                children: app.translator.trans('core.forum.discussion_list.load_more_button'),
                                className: 'Button',
                                onclick: this.loadMore.bind(this)
                            });
                        }

                        if (this.extensions.length === 0 && !this.loading) {
                            var text = app.translator.trans('flagrow-bazaar.admin.page.state.no_results_available');

                            if (!this.props.authorized) {
                                text = app.translator.trans('flagrow-bazaar.admin.page.state.not_authorized');
                            }

                            return m(
                                'div',
                                { className: 'DiscussionList' },
                                Placeholder.component({ text: text })
                            );
                        }

                        return m(
                            'div',
                            { className: 'ExtensionList-wrapper' },
                            m(
                                'ul',
                                { className: 'ExtensionList' },
                                this.extensions.map(function (extension) {
                                    return ExtensionListItem.component({
                                        extension: extension,
                                        repository: _this2.props.repository,
                                        connected: _this2.props.connected,
                                        key: extension.package()
                                    });
                                })
                            ),
                            m(
                                'div',
                                { className: 'ExtensionList-loadMore' },
                                loading
                            )
                        );
                    }
                }, {
                    key: 'update',
                    value: function update(params) {
                        this.props.params = params;

                        this.refresh();
                    }
                }, {
                    key: 'refresh',
                    value: function refresh() {
                        var _this3 = this;

                        var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                        if (clear) {
                            this.loading = true;
                            this.extensions = [];
                        }

                        return this.loadResults().then(function (results) {
                            _this3.extensions = [];
                            _this3.parseResults(results);
                        }, function () {
                            _this3.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'loadResults',
                    value: function loadResults(offset) {
                        var params = this.requestParams();
                        params.page = { offset: offset };
                        params.include = params.include.join(',');

                        return app.store.find('bazaar/extensions', params);
                    }
                }, {
                    key: 'parseResults',
                    value: function parseResults(results) {
                        [].push.apply(this.extensions, results);

                        this.loading = false;
                        this.moreResults = !!results.payload.links.next;

                        m.lazyRedraw();

                        return results;
                    }
                }, {
                    key: 'loadMore',
                    value: function loadMore() {
                        this.loading = true;

                        this.loadResults(this.extensions.length).then(this.parseResults.bind(this));
                    }
                }, {
                    key: 'requestParams',
                    value: function requestParams() {
                        var params = this.props.params;
                        var out = { include: [], filter: {} };

                        out.sort = this.sortMap()[params.sort];

                        if (params.q) {
                            out.filter.q = params.q;
                        }

                        if (params.filter) {
                            out.filter[params.filter] = true;
                        }

                        return out;
                    }
                }, {
                    key: 'sortMap',
                    value: function sortMap() {
                        var map = {};

                        if (this.props.params.q) {
                            map.relevance = '';
                        }

                        return map;
                    }
                }]);
                return ExtensionList;
            }(Component);

            _export('default', ExtensionList);
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

                        // Be careful to always use a `key` with this component or this mis-align the tooltips if items are added or removed
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
                            { className: 'ExtensionListItem ' + (extension.enabled() ? 'enabled ' : 'disabled ') + (extension.installed() ? 'installed ' : 'uninstalled ') + (extension.outdated() ? 'outdated ' : '') + (extension.pending() ? 'pending ' : ''), key: extension.id(), "data-id": extension.id() },
                            m(
                                "div",
                                { className: "ExtensionListItem-content" },
                                m(
                                    "span",
                                    { className: "ExtensionListItem-icon ExtensionIcon", style: extension.icon() || '', title: extension.description() },
                                    extension.icon() ? icon('fas fa-' + extension.icon().name) : ''
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
                                        icon: "fas fa-ellipsis-h" },
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
                                icon: 'fas fa-heart',
                                children: app.translator.trans(favoriteTrans),
                                onclick: function onclick() {
                                    repository().favoriteExtension(extension);
                                }
                            }));
                        }

                        if (!extension.pending()) {
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
                                    onclick: function onclick() {
                                        repository().uninstallExtension(extension);
                                    }
                                }));
                            }

                            if (extension.can_enable()) {
                                items.add('enable', Button.component({
                                    icon: 'fas fa-check-square',
                                    children: app.translator.trans('flagrow-bazaar.admin.page.button.enable'),
                                    onclick: function onclick() {
                                        repository().enableExtension(extension);
                                    }
                                }));
                            }

                            if (extension.installed() && extension.outdated()) {
                                items.add('update', Button.component({
                                    icon: 'fas fa-toggle-up',
                                    children: app.translator.trans('flagrow-bazaar.admin.page.button.update'),
                                    onclick: function onclick() {
                                        repository().updateExtension(extension);
                                    }
                                }));
                            }

                            if (extension.can_disable()) {
                                items.add('disable', Button.component({
                                    icon: 'fas fa-square',
                                    children: app.translator.trans('flagrow-bazaar.admin.page.button.disable'),
                                    onclick: function onclick() {
                                        repository().disableExtension(extension);
                                    }
                                }));
                            }

                            if (extension.can_install()) {
                                items.add('install', Button.component({
                                    icon: 'fas fa-plus-square',
                                    children: app.translator.trans('flagrow-bazaar.admin.page.button.install'),
                                    onclick: function onclick() {
                                        repository().installExtension(extension);
                                    }
                                }));
                            }
                        }

                        if (extension.premium() && !connected) {
                            items.add('subscribe', Button.component({
                                disabled: true,
                                icon: 'fas fa-shopping-cart',
                                children: app.translator.trans('flagrow-bazaar.admin.page.button.connect_to_subscribe')
                            }));
                        }

                        if (extension.canCheckout() && connected) {
                            items.add('subscribe', Button.component({
                                icon: 'fas fa-shopping-cart',
                                children: app.translator.trans('flagrow-bazaar.admin.page.button.subscribe'),
                                onclick: function onclick() {
                                    repository().premiumExtensionSubscribe(extension);
                                }
                            }));
                        }

                        if (extension.canSafelyUnsubscribe() && connected) {
                            items.add('unsubscribe', Button.component({
                                icon: 'fas fa-ban',
                                children: app.translator.trans('flagrow-bazaar.admin.page.button.unsubscribe'),
                                onclick: function onclick() {
                                    repository().premiumExtensionUnsubscribe(extension);
                                }
                            }));
                        }

                        return items;
                    }
                }, {
                    key: "badges",
                    value: function badges(extension) {
                        var items = new ItemList();

                        if (extension.subscribed()) {
                            items.add('subscribed', m(Badge, { icon: "fas fa-shopping-cart",
                                type: "subscribed",
                                label: app.translator.trans('flagrow-bazaar.admin.page.extension.subscribed') }));
                        } else if (extension.premium()) {
                            items.add('premium', m(Badge, { icon: "fas fa-certificate",
                                type: "premium",
                                label: app.translator.trans('flagrow-bazaar.admin.page.extension.premium') }));
                        }
                        if (extension.pending()) {
                            items.add('pending', m(Badge, { icon: "fas fa-circle-notch fa-spin",
                                type: "pending",
                                label: app.translator.trans('flagrow-bazaar.admin.page.extension.pending') }));
                        }

                        if (extension.installed() && extension.outdated()) {
                            items.add('outdated', m(Badge, { icon: "fas fa-warning",
                                type: "outdated",
                                label: app.translator.trans('flagrow-bazaar.admin.page.extension.outdated', { new: extension.highest_version() }) }));
                        }

                        if (extension.favorited()) {
                            items.add('favorited', m(Badge, { icon: "fas fa-heart",
                                type: "favorited",
                                label: app.translator.trans('flagrow-bazaar.admin.page.extension.favorited') }));
                        }

                        if (extension.installed() && !extension.enabled()) {
                            items.add('installed', m(Badge, { icon: "fas fa-plus-square",
                                type: "installed",
                                label: app.translator.trans('flagrow-bazaar.admin.page.extension.installed') }));
                        }

                        if (extension.enabled()) {
                            items.add('enabled', m(Badge, { icon: "fas fa-check-square",
                                type: "enabled",
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
"use strict";

System.register("flagrow/bazaar/components/ExtensionSearch", ["flarum/Component", "./CustomCheckbox", "./../utils/debounce"], function (_export, _context) {
    "use strict";

    var Component, CustomCheckbox, debounce, ExtensionSearch;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_CustomCheckbox) {
            CustomCheckbox = _CustomCheckbox.default;
        }, function (_utilsDebounce) {
            debounce = _utilsDebounce.default;
        }],
        execute: function () {
            ExtensionSearch = function (_Component) {
                babelHelpers.inherits(ExtensionSearch, _Component);

                function ExtensionSearch() {
                    babelHelpers.classCallCheck(this, ExtensionSearch);
                    return babelHelpers.possibleConstructorReturn(this, (ExtensionSearch.__proto__ || Object.getPrototypeOf(ExtensionSearch)).apply(this, arguments));
                }

                babelHelpers.createClass(ExtensionSearch, [{
                    key: "init",
                    value: function init() {
                        var _this2 = this;

                        this.updateDebounce = debounce(function () {
                            if (_this2.props.onsubmit) _this2.props.onsubmit(_this2.props.params);
                        }, 500);
                    }
                }, {
                    key: "view",
                    value: function view() {
                        var _this3 = this;

                        return m('div', [m('fieldset', { className: 'ExtensionSearch' }, m('input[type=text].FormControl', {
                            value: this.props.params.q || '',
                            oninput: m.withAttr('value', function (term) {
                                return _this3.search(term);
                            }),
                            placeholder: app.translator.trans('flagrow-bazaar.admin.search.placeholder')
                        })), m('div', { className: 'ExtensionFilters ButtonGroup' }, [CustomCheckbox.component({
                            icon: 'fas fa-toggle-up',
                            className: 'Button hasIcon',
                            state: this.props.params.filter == 'update_required',
                            onchange: function onchange(checked) {
                                return _this3.toggleFilter('update_required', checked);
                            },
                            children: app.translator.trans('flagrow-bazaar.admin.search.filter_update_required')
                        }), CustomCheckbox.component({
                            icon: 'fas fa-circle-notch',
                            className: 'Button hasIcon',
                            state: this.props.params.filter == 'pending',
                            onchange: function onchange(checked) {
                                return _this3.toggleFilter('pending', checked);
                            },
                            children: app.translator.trans('flagrow-bazaar.admin.search.filter_pending')
                        }), CustomCheckbox.component({
                            icon: 'fas fa-plus-square',
                            className: 'Button hasIcon',
                            state: this.props.params.filter == 'installed',
                            onchange: function onchange(checked) {
                                return _this3.toggleFilter('installed', checked);
                            },
                            children: app.translator.trans('flagrow-bazaar.admin.search.filter_installed')
                        }), this.connected ? [CustomCheckbox.component({
                            icon: 'fas fa-heart',
                            className: 'Button hasIcon',
                            state: this.props.params.filter == 'favorited',
                            onchange: function onchange(checked) {
                                return _this3.toggleFilter('favorited', checked);
                            },
                            children: app.translator.trans('flagrow-bazaar.admin.search.filter_favorited')
                        }), CustomCheckbox.component({
                            icon: 'fas fa-shopping-cart',
                            className: 'Button hasIcon',
                            state: this.props.params.filter == 'subscribed',
                            onchange: function onchange(checked) {
                                return _this3.toggleFilter('subscribed', checked);
                            },
                            children: app.translator.trans('flagrow-bazaar.admin.search.filter_subscribed')
                        })] : '', CustomCheckbox.component({
                            icon: 'fas fa-certificate',
                            className: 'Button hasIcon',
                            state: this.props.params.filter == 'is_premium',
                            onchange: function onchange(checked) {
                                return _this3.toggleFilter('is_premium', checked);
                            },
                            children: app.translator.trans('flagrow-bazaar.admin.search.filter_premium')
                        })])]);
                    }
                }, {
                    key: "toggleFilter",
                    value: function toggleFilter(filter, checked) {
                        if (checked) {
                            this.props.params.filter = filter;
                        } else {
                            this.props.params.filter = null;
                        }

                        this.updateDebounce();
                    }
                }, {
                    key: "search",
                    value: function search(term) {
                        this.props.params.q = term;

                        this.updateDebounce();
                    }
                }]);
                return ExtensionSearch;
            }(Component);

            _export("default", ExtensionSearch);
        }
    };
});;
"use strict";

System.register("flagrow/bazaar/components/TaskListItem", ["flarum/app", "flarum/Component", "flarum/helpers/icon", "flarum/components/Button", "flarum/helpers/humanTime", "flarum/helpers/fullTime"], function (_export, _context) {
    "use strict";

    var app, Component, icon, Button, humanTime, fullTime, TaskListItem;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumHelpersHumanTime) {
            humanTime = _flarumHelpersHumanTime.default;
        }, function (_flarumHelpersFullTime) {
            fullTime = _flarumHelpersFullTime.default;
        }],
        execute: function () {
            TaskListItem = function (_Component) {
                babelHelpers.inherits(TaskListItem, _Component);

                function TaskListItem() {
                    babelHelpers.classCallCheck(this, TaskListItem);
                    return babelHelpers.possibleConstructorReturn(this, (TaskListItem.__proto__ || Object.getPrototypeOf(TaskListItem)).apply(this, arguments));
                }

                babelHelpers.createClass(TaskListItem, [{
                    key: "init",
                    value: function init() {
                        this.extended = m.prop(false);
                    }
                }, {
                    key: "view",
                    value: function view() {
                        var _this2 = this;

                        var task = this.props.task;
                        var iconName = function () {
                            switch (task.status()) {
                                case 'success':
                                    return 'check';
                                case 'exception':
                                    return 'exclamation';
                                case 'working':
                                    return 'spinner';
                            }
                            return 'clock-o';
                        }();

                        // We need to wrap items in a tbody because Mithril 0.2 and therefore flarum/Component does not allow a list of vnodes to be returned from a view
                        // And we can't wrap <tr> in anything else without breaking the table
                        // Having multiple <tbody> does not seem to be too much an issue https://stackoverflow.com/a/3076790/3133038
                        return m(
                            "tbody",
                            { className: 'TaskListItem status-' + task.status() },
                            m(
                                "tr",
                                null,
                                m(
                                    "td",
                                    { className: "time-column" },
                                    humanTime(task.created_at())
                                ),
                                m(
                                    "td",
                                    { className: "status-column", title: app.translator.trans('flagrow-bazaar.admin.page.task.status.' + (task.status() !== null ? task.status() : 'unknown')) },
                                    m(
                                        "div",
                                        { className: "status" },
                                        icon(iconName)
                                    )
                                ),
                                m(
                                    "td",
                                    { className: "command-column" },
                                    app.translator.trans('flagrow-bazaar.admin.page.task.command.' + task.command(), { extension: m(
                                            "strong",
                                            null,
                                            task.package()
                                        ) })
                                ),
                                m(
                                    "td",
                                    { className: "details-column" },
                                    Button.component({
                                        icon: 'fas fa-plus',
                                        className: 'Button',
                                        onclick: function onclick() {
                                            _this2.extended(!_this2.extended());
                                        }
                                    })
                                )
                            ),
                            this.extended() ? m(
                                "tr",
                                null,
                                m(
                                    "td",
                                    { className: "output-column", colspan: "4" },
                                    m(
                                        "dl",
                                        null,
                                        m(
                                            "dt",
                                            null,
                                            app.translator.trans('flagrow-bazaar.admin.page.task.attribute.created_at')
                                        ),
                                        m(
                                            "dd",
                                            null,
                                            fullTime(task.created_at())
                                        )
                                    ),
                                    m(
                                        "dl",
                                        null,
                                        m(
                                            "dt",
                                            null,
                                            app.translator.trans('flagrow-bazaar.admin.page.task.attribute.started_at')
                                        ),
                                        m(
                                            "dd",
                                            null,
                                            fullTime(task.started_at())
                                        )
                                    ),
                                    m(
                                        "dl",
                                        null,
                                        m(
                                            "dt",
                                            null,
                                            app.translator.trans('flagrow-bazaar.admin.page.task.attribute.finished_at')
                                        ),
                                        m(
                                            "dd",
                                            null,
                                            fullTime(task.finished_at())
                                        )
                                    ),
                                    m(
                                        "p",
                                        null,
                                        app.translator.trans('flagrow-bazaar.admin.page.task.header.output')
                                    ),
                                    m(
                                        "pre",
                                        { className: "output" },
                                        task.output()
                                    )
                                )
                            ) : null
                        );
                    }
                }]);
                return TaskListItem;
            }(Component);

            _export("default", TaskListItem);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/components/TasksPage', ['flarum/app', 'flarum/Component', 'flagrow/bazaar/utils/TaskRepository', 'flagrow/bazaar/components/BazaarPageHeader', 'flagrow/bazaar/components/TaskListItem', 'flagrow/bazaar/components/BazaarLoader'], function (_export, _context) {
    "use strict";

    var app, Component, TaskRepository, BazaarPageHeader, TaskListItem, BazaarLoader, TasksPage;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flagrowBazaarUtilsTaskRepository) {
            TaskRepository = _flagrowBazaarUtilsTaskRepository.default;
        }, function (_flagrowBazaarComponentsBazaarPageHeader) {
            BazaarPageHeader = _flagrowBazaarComponentsBazaarPageHeader.default;
        }, function (_flagrowBazaarComponentsTaskListItem) {
            TaskListItem = _flagrowBazaarComponentsTaskListItem.default;
        }, function (_flagrowBazaarComponentsBazaarLoader) {
            BazaarLoader = _flagrowBazaarComponentsBazaarLoader.default;
        }],
        execute: function () {
            TasksPage = function (_Component) {
                babelHelpers.inherits(TasksPage, _Component);

                function TasksPage() {
                    babelHelpers.classCallCheck(this, TasksPage);
                    return babelHelpers.possibleConstructorReturn(this, (TasksPage.__proto__ || Object.getPrototypeOf(TasksPage)).apply(this, arguments));
                }

                babelHelpers.createClass(TasksPage, [{
                    key: 'init',
                    value: function init() {
                        // Used in the header
                        app.current = this;

                        this.loading = m.prop(false);
                        this.repository = new TaskRepository(this.loading);
                        this.repository.loadNextPage();
                        this.loader = BazaarLoader.component({ loading: this.loading });
                        this.connected = app.data.settings['flagrow.bazaar.connected'] && app.data.settings['flagrow.bazaar.connected'] !== '0';
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return m(
                            'div',
                            { className: 'ExtensionsPage Bazaar TaskPage' },
                            BazaarPageHeader.component({ connected: this.connected }),
                            m(
                                'div',
                                { className: 'ExtensionsPage-list' },
                                m(
                                    'div',
                                    { className: 'container' },
                                    this.taskGroups().map(function (group) {
                                        return group.tasks.length ? m(
                                            'div',
                                            null,
                                            m(
                                                'h2',
                                                null,
                                                group.title
                                            ),
                                            m(
                                                'table',
                                                { className: 'TaskPage-table' },
                                                m(
                                                    'thead',
                                                    null,
                                                    m(
                                                        'tr',
                                                        null,
                                                        m(
                                                            'th',
                                                            { className: 'time-column' },
                                                            app.translator.trans('flagrow-bazaar.admin.page.task.header.time')
                                                        ),
                                                        m(
                                                            'th',
                                                            { className: 'status-column' },
                                                            app.translator.trans('flagrow-bazaar.admin.page.task.header.status')
                                                        ),
                                                        m(
                                                            'th',
                                                            null,
                                                            app.translator.trans('flagrow-bazaar.admin.page.task.header.command')
                                                        ),
                                                        m(
                                                            'th',
                                                            { className: 'details-column' },
                                                            app.translator.trans('flagrow-bazaar.admin.page.task.header.details')
                                                        )
                                                    )
                                                ),
                                                group.tasks.map(function (task) {
                                                    return m(TaskListItem, { task: task });
                                                })
                                            )
                                        ) : null;
                                    })
                                )
                            ),
                            this.loader
                        );
                    }
                }, {
                    key: 'taskGroups',
                    value: function taskGroups() {
                        var taskGroups = [{
                            title: app.translator.trans('flagrow-bazaar.admin.page.task.group.today'),
                            tasks: []
                        }, {
                            title: app.translator.trans('flagrow-bazaar.admin.page.task.group.lastmonth'),
                            tasks: []
                        }, {
                            title: app.translator.trans('flagrow-bazaar.admin.page.task.group.older'),
                            tasks: []
                        }];
                        var currentGroup = 0;

                        // Milliseconds from 1 January 1970 00:00:00 UTC
                        var today = new Date().setHours(0, 0, 0, 0);

                        this.repository.tasks().forEach(function (task) {
                            // Milliseconds from 1 January 1970 00:00:00 UTC
                            var taskDate = new Date(task.created_at()).setHours(0, 0, 0, 0);

                            switch (currentGroup) {
                                case 0:
                                    if (taskDate === today) {
                                        taskGroups[currentGroup].tasks.push(task);
                                    } else {
                                        currentGroup++;
                                    }
                                    break;
                                case 1:
                                    // Check if the date is within the last 30 days
                                    if ((today - taskDate) / (1000 * 3600 * 24) <= 30) {
                                        taskGroups[currentGroup].tasks.push(task);
                                    } else {
                                        currentGroup++;
                                    }
                                    break;
                                default:
                                    taskGroups[currentGroup].tasks.push(task);
                            }
                        });

                        return taskGroups;
                    }
                }]);
                return TasksPage;
            }(Component);

            _export('default', TasksPage);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/main', ['flarum/extend', 'flarum/app', 'flagrow/bazaar/modals/BazaarSettingsModal', 'flagrow/bazaar/models/Extension', 'flagrow/bazaar/models/Task', 'flagrow/bazaar/addBazaarPage', 'flagrow/bazaar/addTasksPage'], function (_export, _context) {
    "use strict";

    var extend, app, BazaarSettingsModal, Extension, Task, addBazaarPage, addTasksPage;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowBazaarModalsBazaarSettingsModal) {
            BazaarSettingsModal = _flagrowBazaarModalsBazaarSettingsModal.default;
        }, function (_flagrowBazaarModelsExtension) {
            Extension = _flagrowBazaarModelsExtension.default;
        }, function (_flagrowBazaarModelsTask) {
            Task = _flagrowBazaarModelsTask.default;
        }, function (_flagrowBazaarAddBazaarPage) {
            addBazaarPage = _flagrowBazaarAddBazaarPage.default;
        }, function (_flagrowBazaarAddTasksPage) {
            addTasksPage = _flagrowBazaarAddTasksPage.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-bazaar', function (app) {
                app.extensionSettings['flagrow-bazaar'] = function () {
                    return app.modal.show(new BazaarSettingsModal());
                };
                app.store.models['bazaar-extensions'] = Extension;
                app.store.models['bazaar-tasks'] = Task;

                addBazaarPage();
                addTasksPage();
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

System.register('flagrow/bazaar/modals/BazaarSettingsModal', ['flarum/app', 'flarum/components/SettingsModal', 'flarum/components/Switch'], function (_export, _context) {
  "use strict";

  var app, SettingsModal, Switch, BazaarSettingsModal;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsSettingsModal) {
      SettingsModal = _flarumComponentsSettingsModal.default;
    }, function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch.default;
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
            return [m('div', { className: 'Form-group' }, [m('label', { for: 'use-cron' }, app.translator.trans('flagrow-bazaar.admin.modal.settings.field.use_cron_for_tasks.label')), Switch.component({
              state: this.setting('flagrow.bazaar.use_cron_for_tasks')(),
              onchange: this.setting('flagrow.bazaar.use_cron_for_tasks'),
              children: app.translator.trans('flagrow-bazaar.admin.modal.settings.field.use_cron_for_tasks.toggle')
            }), m('span', app.translator.trans('flagrow-bazaar.admin.modal.settings.field.use_cron_for_tasks.description', {
              a: m('a', { href: 'https://github.com/flagrow/bazaar/wiki/Cron-task-processing', target: '_blank' })
            }))]), m('div', { className: 'Form-group' }, [m('label', { for: 'bazaar-api-token' }, app.translator.trans('flagrow-bazaar.admin.modal.settings.field.token.label')), m('input', {
              id: 'bazaar-api-token',
              className: 'FormControl',
              bidi: this.setting('flagrow.bazaar.api_token')
            }), m('span', app.translator.trans('flagrow-bazaar.admin.modal.settings.field.token.description'))])];
          }
        }]);
        return BazaarSettingsModal;
      }(SettingsModal);

      _export('default', BazaarSettingsModal);
    }
  };
});;
'use strict';

System.register('flagrow/bazaar/modals/DashboardModal', ['flarum/components/Switch', 'flarum/components/SettingsModal', 'flarum/utils/saveSettings', 'flarum/components/Button'], function (_export, _context) {
  "use strict";

  var Switch, SettingsModal, saveSettings, Button, DashboardModal;
  return {
    setters: [function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch.default;
    }, function (_flarumComponentsSettingsModal) {
      SettingsModal = _flarumComponentsSettingsModal.default;
    }, function (_flarumUtilsSaveSettings) {
      saveSettings = _flarumUtilsSaveSettings.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      DashboardModal = function (_SettingsModal) {
        babelHelpers.inherits(DashboardModal, _SettingsModal);

        function DashboardModal() {
          babelHelpers.classCallCheck(this, DashboardModal);
          return babelHelpers.possibleConstructorReturn(this, (DashboardModal.__proto__ || Object.getPrototypeOf(DashboardModal)).apply(this, arguments));
        }

        babelHelpers.createClass(DashboardModal, [{
          key: 'title',
          value: function title() {
            return app.translator.trans('flagrow-bazaar.admin.modal.dashboard.title');
          }
        }, {
          key: 'form',
          value: function form() {
            var flagrowHost = this.props.flagrowHost;
            var syncing = this.setting('flagrow.bazaar.sync', false);

            return m('div', { className: 'Modal-body' }, [m('p', app.translator.trans('flagrow-bazaar.admin.modal.dashboard.sync.description', { host: flagrowHost })), Switch.component({
              state: syncing() === true || syncing() == 1,
              onchange: this.updateSetting.bind(this, syncing, 'flagrow.bazaar.sync'),
              children: app.translator.trans('flagrow-bazaar.admin.modal.dashboard.sync.switch', { host: flagrowHost })
            })]);
          }
        }, {
          key: 'submitButton',
          value: function submitButton() {
            var flagrowHost = this.props.flagrowHost;
            return m('div', { className: 'ButtonGroup' }, [Button.component({
              className: 'Button Connected',
              icon: 'dashboard',
              children: app.translator.trans('flagrow-bazaar.admin.modal.dashboard.visit-remote-dashboard'),
              onclick: function onclick() {
                return window.open(flagrowHost + '/home');
              }
            })]);
          }
        }, {
          key: 'updateSetting',
          value: function updateSetting(prop, setting, value) {
            saveSettings(babelHelpers.defineProperty({}, setting, value));

            prop(value);
          }
        }]);
        return DashboardModal;
      }(SettingsModal);

      _export('default', DashboardModal);
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
                locale: Model.attribute('locale'),

                stars: Model.attribute('stars'),
                forks: Model.attribute('forks'),
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
                can_install: computed('installed', 'premium', 'subscribed', function (installed, premium, subscribed) {
                    return !installed && (!premium || subscribed);
                }),
                can_uninstall: computed('installed', 'enabled', function (installed, enabled) {
                    return installed && !enabled;
                }),

                // Enable/disable
                can_enable: computed('installed', 'enabled', function (installed, enabled) {
                    return installed && !enabled;
                }),
                can_disable: computed('installed', 'enabled', function (installed, enabled) {
                    return installed && enabled;
                }),

                canCheckout: Model.attribute('canCheckout'),
                canUnsubscribe: Model.attribute('canUnsubscribe'),
                canSafelyUnsubscribe: computed('canUnsubscribe', 'installed', function (canUnsubscribe, installed) {
                    return canUnsubscribe && !installed;
                }),

                favorited: Model.attribute('favorited')
            }));

            _export('default', Extension);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/models/Task', ['flarum/Model', 'flarum/utils/mixin'], function (_export, _context) {
    "use strict";

    var Model, mixin, Task;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }],
        execute: function () {
            Task = function (_mixin) {
                babelHelpers.inherits(Task, _mixin);

                function Task() {
                    babelHelpers.classCallCheck(this, Task);
                    return babelHelpers.possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).apply(this, arguments));
                }

                return Task;
            }(mixin(Model, {
                status: Model.attribute('status'),
                command: Model.attribute('command'),
                package: Model.attribute('package'),
                output: Model.attribute('output'),
                created_at: Model.attribute('created_at'),
                started_at: Model.attribute('started_at'),
                finished_at: Model.attribute('finished_at')
            }));

            _export('default', Task);
        }
    };
});;
"use strict";

System.register("flagrow/bazaar/utils/debounce", [], function (_export, _context) {
    "use strict";

    _export("default", function (func, wait, immediate) {
        var timeout = void 0;
        return function () {
            var context = this,
                args = arguments;
            var later = function later() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    });

    return {
        setters: [],
        execute: function () {
            ; /**
               * Based on _.debounce from underscore.js
               * Copyright (c) 2009-2017 Jeremy Ashkenas, DocumentCloud and Investigative
               * @see https://davidwalsh.name/javascript-debounce-function
               *
               * Returns a function, that, as long as it continues to be invoked, will not
               * be triggered. The function will be called after it stops being called for
               * N milliseconds. If `immediate` is passed, trigger the function on the
               * leading edge, instead of the trailing.
               */
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/utils/ExtensionRepository', ['flarum/app', './popupPromise'], function (_export, _context) {
    "use strict";

    var app, popupPromise, ExtensionRepository;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_popupPromise) {
            popupPromise = _popupPromise.default;
        }],
        execute: function () {
            ExtensionRepository = function () {
                function ExtensionRepository() {
                    babelHelpers.classCallCheck(this, ExtensionRepository);

                    this.extensions = m.prop([]);
                }

                /**
                 * Handles a request error
                 */


                babelHelpers.createClass(ExtensionRepository, [{
                    key: 'requestError',
                    value: function requestError() {
                        // If an error occured, we can clear the loading overlay
                        // The error means it's not processing anymore
                        this.loading('error');

                        // Depending on how fast the "Oops! Something went wrong" popup appears,
                        // the loading change is not taken into account. Use redraw to force remove the overlay
                        m.redraw();
                    }
                }, {
                    key: 'installExtension',
                    value: function installExtension(extension) {
                        var _this = this;

                        this.loading(true);

                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions',
                            timeout: 0,
                            data: {
                                id: extension.id()
                            }
                        }).then(function (response) {
                            _this.updateExtensionInRepository(response);
                        }).catch(function () {
                            return _this.requestError();
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
                        var _this2 = this;

                        this.loading(true);

                        app.request({
                            method: 'DELETE',
                            timeout: 0,
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id()
                        }).then(function (response) {
                            _this2.updateExtensionInRepository(response);
                        }).catch(function () {
                            return _this2.requestError();
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
                        var _this3 = this;

                        this.loading(true);

                        app.request({
                            method: 'post',
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id() + '/favorite',
                            data: {
                                favorite: extension.favorited() != true
                            }
                        }).then(function (response) {
                            _this3.updateExtensionInRepository(response);
                        }).catch(function () {
                            return _this3.requestError();
                        });
                    }
                }, {
                    key: 'premiumExtensionSubscribe',
                    value: function premiumExtensionSubscribe(extension) {
                        var buy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                        //this.loading(true);

                        var popup = popupPromise({
                            url: app.forum.attribute('apiUrl') + '/bazaar/redirect/' + (buy ? '' : 'un') + 'subscribe/' + extension.id(),
                            waitForUrl: app.forum.attribute('apiUrl') + '/bazaar/callback/subscription'
                        });

                        popup.then(function () {
                            window.location.reload();
                        }).catch(function () {
                            alert(app.translator.trans('flagrow-bazaar.admin.page.extension.subscribe_check_failed'));
                        });
                    }
                }, {
                    key: 'premiumExtensionUnsubscribe',
                    value: function premiumExtensionUnsubscribe(extension) {
                        this.premiumExtensionSubscribe(extension, false);
                    }
                }, {
                    key: 'updateExtension',
                    value: function updateExtension(extension) {
                        var _this4 = this;

                        this.loading(true);

                        app.request({
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id(),
                            timeout: 0,
                            method: 'PATCH'
                        }).then(function (response) {
                            _this4.updateExtensionInRepository(response);
                        }).then(function () {
                            location.reload();
                        }).catch(function () {
                            return _this4.requestError();
                        });
                    }
                }, {
                    key: 'toggleExtension',
                    value: function toggleExtension(extension) {
                        var _this5 = this;

                        this.loading(true);

                        var enabled = extension.enabled();

                        app.request({
                            url: app.forum.attribute('apiUrl') + '/bazaar/extensions/' + extension.id() + '/toggle',
                            method: 'PATCH',
                            data: { enabled: !enabled }
                        }).then(function (response) {
                            _this5.updateExtensionInRepository(response);
                        }).catch(function () {
                            return _this5.requestError();
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
                }]);
                return ExtensionRepository;
            }();

            _export('default', ExtensionRepository);
        }
    };
});;
'use strict';

System.register('flagrow/bazaar/utils/popupPromise', [], function (_export, _context) {
    "use strict";

    _export('default', function () {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var url = settings.url || '/';
        var waitForUrl = settings.waitForUrl || null;
        var width = settings.width || 600;
        var height = settings.height || 400;
        var $window = $(window);

        // The new Promise polyfill of Mithril v1 is a lot better
        var deferred = m.deferred();

        var popup = window.open(url, 'bazaarPopup', 'width=' + width + ',' + ('height=' + height + ',') + ('top=' + ($window.height() / 2 - height / 2) + ',') + ('left=' + ($window.width() / 2 - width / 2) + ',') + 'status=no,scrollbars=no,resizable=no');

        var interval = window.setInterval(function () {
            try {
                if (popup.closed) {
                    window.clearInterval(interval);
                    deferred.reject();
                } else if (popup.document.URL === waitForUrl) {
                    window.clearInterval(interval);
                    popup.close();
                    deferred.resolve();
                }
            } catch (e) {
                // Ignore errors, these will be cross-origin exceptions
            }
        }, 500);

        return deferred.promise;
    });

    return {
        setters: [],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/bazaar/utils/TaskRepository', ['flarum/app'], function (_export, _context) {
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

                    this.tasks = m.prop([]);
                    this.nextPageUrl = null;
                    this.loading = loading;
                    this.resetNavigation();
                }

                babelHelpers.createClass(ExtensionRepository, [{
                    key: 'loadNextPage',
                    value: function loadNextPage() {
                        var _this = this;

                        if (this.loading() || !this.nextPageUrl) {
                            return;
                        }

                        this.loading(true);

                        app.request({
                            method: 'GET',
                            url: this.nextPageUrl
                        }).then(function (result) {
                            var newTasks = result.data.map(function (data) {
                                return app.store.createRecord('bazaar-tasks', data);
                            });
                            _this.tasks(newTasks);
                            _this.nextPageUrl = null;
                            _this.loading(false);

                            m.redraw();
                        });
                    }
                }, {
                    key: 'resetNavigation',
                    value: function resetNavigation() {
                        this.loading(false);
                        this.nextPageUrl = app.forum.attribute('apiUrl') + '/bazaar/tasks';
                        this.tasks([]);
                    }
                }]);
                return ExtensionRepository;
            }();

            _export('default', ExtensionRepository);
        }
    };
});