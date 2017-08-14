import Modal from "flarum/components/Modal";
import Button from "flarum/components/Button";
import Select from "flarum/components/Select";
import SettingsModal from 'flarum/components/SettingsModal';

export default class DashboardModal extends SettingsModal {
    title() {
        return app.translator.trans('flagrow-bazaar.admin.modal.dashboard.title');
    }

    form() {
        const flagrowHost = this.props.flagrowHost;
        const interval = this.setting('flagrow.bazaar.sync_interval', 'off');
        let intervals = {};

        for (const i of this.syncIntervalList()) {
            intervals[i] = app.translator.trans('flagrow-bazaar.admin.modal.dashboard.sync-interval.' + i);
        }

        return m('div', {className: 'Modal-body'}, [
                m('p', app.translator.trans('flagrow-bazaar.admin.modal.dashboard.sync-interval.description', {host: flagrowHost})),
                Select.component({
                    options: intervals,
                    value: interval(),
                    onchange: this.updateInterval.bind(this)
                }),
            ]
        );
    }

    updateInterval(value) {
        this.settings['flagrow.bazaar.sync_interval'](value);
    }

    submitButton() {
        const flagrowHost = this.props.flagrowHost;
        return m('div', {className: 'ButtonGroup'}, [
            Button.component({
                className: 'Button Connected',
                icon: 'dashboard',
                children: app.translator.trans('flagrow-bazaar.admin.modal.dashboard.visit-remote-dashboard'),
                onclick: () => window.open(flagrowHost + '/home')
            }),
            super.submitButton(),
        ]);
    }

    syncIntervalList() {
        // app.translator.trans('flagrow-bazaar.admin.sync-interval.off')
        return [
            'off',
            'daily',
            'weekly',
            'monthly'
        ]
    }
}
