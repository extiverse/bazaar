import Modal from "flarum/components/Modal";
import Button from "flarum/components/Button";

export default class BazaarConnectModal extends Modal {
    className() {
        return 'FilePermissionsModal';
    }

    title() {
        return app.translator.trans('bazaar.admin.modal.connect-bazaar.title');
    }

    content() {
        let flagrowHost = this.props.flagrowHost;

        return m('div', {className: 'Modal-body'}, [
                m('p', app.translator.trans('bazaar.admin.modal.connect-bazaar.description', {host: flagrowHost})),
                m('div', {className: "App-primaryControl"}, [
                    Button.component({
                        type: 'submit',
                        className: 'Button Button--primary Button--block',
                        disabled: false,
                        icon: 'check',
                        children: app.translator.trans('bazaar.admin.page.button.connect')
                    })
                ])
            ]
        );
    }

    connect() {
        var popup = window.open();

        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/bazaar/connect'
        }).then(response => {
            if (response && response.redirect) {
                popup.location = response.redirect;
            } else {
                popup.close()
            }
        });
    }

    /**
     * Handle the modal form's submit event.
     *
     * @param {Event} e
     */
    onsubmit() {
        this.connect();
    }
}
