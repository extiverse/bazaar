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

System.register('flagrow/bazaar/main', ['flarum/extend', 'flarum/app', 'flagrow/bazaar/components/BazaarSettingsModal'], function (_export, _context) {
    "use strict";

    var extend, app, BazaarSettingsModal;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowBazaarComponentsBazaarSettingsModal) {
            BazaarSettingsModal = _flagrowBazaarComponentsBazaarSettingsModal.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-bazaar', function (app) {
                app.extensionSettings['flagrow-bazaar'] = function () {
                    return app.modal.show(new BazaarSettingsModal());
                };
            });
        }
    };
});