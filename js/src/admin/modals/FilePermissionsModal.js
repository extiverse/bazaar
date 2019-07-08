import Modal from "flarum/components/Modal";

export default class FilePermissionsModal extends Modal {
    className() {
        return 'FilePermissionsModal';
    }

    title() {
        return app.translator.trans('bazaar.admin.modal.requirements.file-permissions.title');
    }

    content() {
        var permissions = this.props.file_permissions;
        var paths = [];

        permissions.forEach(path => {
            paths.push(m('li', m('span', {className: 'code'}, path)))
        })

        return m('div', {className: 'Modal-body'}, [
                m('p', app.translator.trans(
                    'bazaar.admin.modal.requirements.file-permissions.description',
                    {a: <a href="https://github.com/flagrow/bazaar/wiki/File-permissions" target="_blank"/>}
                )),
                m('ul', paths)
            ]
        );
    }
}
