import Modal from "flarum/components/Modal";

export default class MemoryLimitModal extends Modal {
    className() {
        return 'MemoryLimitModal';
    }

    title() {
        return app.translator.trans('bazaar.admin.modal.requirements.php-memory_limit.title');
    }

    content() {
        let memory_requested = this.props.memory_requested;
        let memory_limit = this.props.memory_limit;

        return m(
            'div',
            {className: 'Modal-body'},
            app.translator.trans(
                'bazaar.admin.modal.requirements.php-memory_limit.description',
                {
                    required: memory_requested,
                    limit: memory_limit,
                    a: <a href="https://github.com/flagrow/bazaar/wiki/PHP-memory-limit" target="_blank"/>
                }
            )
        );
    }
}
