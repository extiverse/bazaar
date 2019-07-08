import app from 'flarum/app';
import Component from "flarum/Component";
import icon from "flarum/helpers/icon";
import Button from "flarum/components/Button";
import humanTime from 'flarum/helpers/humanTime';
import fullTime from 'flarum/helpers/fullTime';

export default class TaskListItem extends Component {
    init() {
        this.extended = m.prop(false);
    }

    view() {
        const task = this.props.task;
        const iconName = (function() {
            switch (task.status()) {
                case 'success':
                    return 'fas fa-check';
                case 'exception':
                    return 'fas fa-exclamation';
                case 'working':
                    return 'fas fa-spinner';
            }
            return 'fas fa-clock';
        })();

        // We need to wrap items in a tbody because Mithril 0.2 and therefore flarum/Component does not allow a list of vnodes to be returned from a view
        // And we can't wrap <tr> in anything else without breaking the table
        // Having multiple <tbody> does not seem to be too much an issue https://stackoverflow.com/a/3076790/3133038
        return (
            <tbody className={ 'TaskListItem status-' + task.status() }>
                <tr>
                    <td className="time-column">{ humanTime(task.created_at()) }</td>
                    <td className="status-column" title={ app.translator.trans('bazaar.admin.page.task.status.' + (task.status() !== null ? task.status() : 'unknown')) }><div className="status">{ icon(iconName) }</div></td>
                    <td className="command-column">
                        { app.translator.trans('bazaar.admin.page.task.command.' + task.command(), {extension: (<strong>{ task.package() }</strong>)}) }
                    </td>
                    <td className="details-column">
                        { Button.component({
                            icon: 'fas fa-plus',
                            className: 'Button',
                            onclick: () => { this.extended(!this.extended()); }
                        }) }
                    </td>
                </tr>
                { this.extended() ? (
                    <tr>
                        <td className="output-column" colspan="4">
                            <dl>
                                <dt>{ app.translator.trans('bazaar.admin.page.task.attribute.created_at') }</dt>
                                <dd>{ fullTime(task.created_at()) }</dd>
                            </dl>
                            <dl>
                                <dt>{ app.translator.trans('bazaar.admin.page.task.attribute.started_at') }</dt>
                                <dd>{ fullTime(task.started_at()) }</dd>
                            </dl>
                            <dl>
                                <dt>{ app.translator.trans('bazaar.admin.page.task.attribute.finished_at') }</dt>
                                <dd>{ fullTime(task.finished_at()) }</dd>
                            </dl>
                            <p>{ app.translator.trans('bazaar.admin.page.task.header.output') }</p>
                            <pre className="output">{ task.output() }</pre>
                        </td>
                    </tr>
                ) : null}
            </tbody>
        );
    }
}
