import Modal from "flarum/components/Modal";

export default class FilePermissionsModal extends Modal {
    className() {
        return 'FilePermissionsModal';
    }

    title() {
        return app.translator.trans('flagrow-bazaar.admin.modal.requirements.file-permissions.title');
    }

    content() {
        var permissions = this.props.file_permissions;

        return m('div', {className: 'Modal-body'}, [
                m('p', app.translator.trans(
                    'flagrow-bazaar.admin.modal.requirements.file-permissions.description',
                    {a: <a href="https://github.com/flagrow/bazaar/wiki/File-permissions" target="_blank"/>}
                )),
                m('ul', permissions.forEach(path => {
                    m('li', [
                        m('span', {className: 'code'}, path)
                    ])
                }))
            ]
        );
    }
}
