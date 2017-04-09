import app from 'flarum/app';
import Component from "flarum/Component";
import icon from "flarum/helpers/icon";
import Button from "flarum/components/Button";

export default class ExtensionListItem extends Component {
    init() {
        this.extended = m.prop(false);
    }

    view() {
        const task = this.props.task;
        const iconName = (function() {
            switch (task.status()) {
                case 'success':
                    return 'check';
                case 'exception':
                    return 'exclamation';
                case 'working':
                    return 'spinner';
            }
            return 'clock-o';
        })();

        return <tr className={ 'TaskListItem status-' + task.status() }>
            <td title={ app.translator.trans('flagrow-bazaar.admin.page.task.status.' + (task.status() !== null ? task.status() : 'unknown')) }>{ icon(iconName) }</td>
            <td>
                <div className="command">
                    { app.translator.trans('flagrow-bazaar.admin.page.task.command.' + task.command(), {extension: task.package()}) }
                    { Button.component({
                        icon: 'plus',
                        className: 'Button',
                        onclick: () => { this.extended(!this.extended()); }
                    }) }
                </div>
                { this.extended() ? <pre className="output">{ task.output() }</pre> : '' }
            </td>
            <td>{ task.started_at() }</td>
            <td>{ task.finished_at() }</td>
        </tr>;
    }
}
