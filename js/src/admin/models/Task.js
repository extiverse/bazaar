import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';

export default class Task extends mixin(Model, {
    status: Model.attribute('status'),
    command: Model.attribute('command'),
    package: Model.attribute('package'),
    output: Model.attribute('output'),
    created_at: Model.attribute('created_at'),
    started_at: Model.attribute('started_at'),
    finished_at: Model.attribute('finished_at')
}) {}
