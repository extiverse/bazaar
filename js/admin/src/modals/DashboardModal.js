import Modal from "flarum/components/Modal";
import Button from "flarum/components/Button";
import Select from "flarum/components/Select";

export default class DashboardModal extends Modal {
    className() {
        return 'DashboardModal';
    }

    title() {
        return app.translator.trans('flagrow-bazaar.admin.modal.dashboard.title');
    }

    content() {
        let flagrowHost = this.props.flagrowHost;
        let syncInterval = this.props.syncInterval;

        let intervals = {};

        for (const i of this.syncIntervalList()) {
            intervals[i] = app.translator.trans('flagrow-bazaar.admin.modal.dashboard.sync-interval.' + i);
        }

        return m('div', {className: 'Modal-body'}, [
                m('p', app.translator.trans('flagrow-bazaar.admin.modal.dashboard.sync-interval.description', {host: flagrowHost})),
                Select.component({
                    options: intervals,
                    value: syncInterval
                }),
                m('div', {className: "App-primaryControl"}, [
                    Button.component({
                        type: 'submit',
                        className: 'Button Button--block',
                        disabled: false,
                        icon: 'check',
                        children: app.translator.trans('core.admin.basics.submit_button')
                    }),
                    Button.component({
                        className: 'Button Connected Button--block',
                        icon: 'dashboard',
                        children: app.translator.trans('flagrow-bazaar.admin.modal.dashboard.visit-remote-dashboard'),
                        onclick: () => window.open(flagrowHost + '/home')
                    }),
                ])
            ]
        );
    }

    /**
     * Handle the modal form's submit event.
     *
     * @param {Event} e
     */
    onsubmit() {

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
