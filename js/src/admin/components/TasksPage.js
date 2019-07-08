import app from 'flarum/app';
import Component from 'flarum/Component';
import TaskRepository from './../utils/TaskRepository';
import BazaarPageHeader from './BazaarPageHeader';
import TaskListItem from './TaskListItem';
import BazaarLoader from './BazaarLoader';

export default class TasksPage extends Component {
    init() {
        // Used in the header
        app.current = this;

        this.loading = m.prop(false);
        this.repository = new TaskRepository(this.loading);
        this.repository.loadNextPage();
        this.loader = BazaarLoader.component({loading: this.loading});
        this.connected = app.data.settings['flagrow.bazaar.connected'] && app.data.settings['flagrow.bazaar.connected'] !== '0';
    }

    view() {
        return (
            <div className="ExtensionsPage Bazaar TaskPage">
                {BazaarPageHeader.component({connected: this.connected})}

                <div className="ExtensionsPage-list">
                    <div className="container">
                        { this.taskGroups().map(
                            group => group.tasks.length ? (
                                <div>
                                    <h2>{ group.title }</h2>
                                    <table className="TaskPage-table">
                                        <thead>
                                        <tr>
                                            <th className="time-column">{ app.translator.trans('bazaar.admin.page.task.header.time') }</th>
                                            <th className="status-column">{ app.translator.trans('bazaar.admin.page.task.header.status') }</th>
                                            <th>{ app.translator.trans('bazaar.admin.page.task.header.command') }</th>
                                            <th className="details-column">{ app.translator.trans('bazaar.admin.page.task.header.details') }</th>
                                        </tr>
                                        </thead>
                                        { group.tasks.map(
                                            task => m(TaskListItem, {task: task})
                                        ) }
                                    </table>
                                </div>
                            ) : null
                        ) }
                    </div>
                </div>
                { this.loader }
            </div>
        );
    }

    /**
     * Split tasks into three groups: today, this month and older
     */
    taskGroups() {
        let taskGroups = [
            {
                title: app.translator.trans('bazaar.admin.page.task.group.today'),
                tasks: []
            },
            {
                title: app.translator.trans('bazaar.admin.page.task.group.lastmonth'),
                tasks: []
            },
            {
                title: app.translator.trans('bazaar.admin.page.task.group.older'),
                tasks: []
            }
        ];
        let currentGroup = 0;

        // Milliseconds from 1 January 1970 00:00:00 UTC
        const today = (new Date()).setHours(0,0,0,0);

        this.repository.tasks().forEach(task => {
            // Milliseconds from 1 January 1970 00:00:00 UTC
            const taskDate = new Date(task.created_at()).setHours(0,0,0,0);

            switch (currentGroup) {
                case 0:
                    if (taskDate === today) {
                        taskGroups[currentGroup].tasks.push(task);
                    } else {
                        currentGroup++;
                    }
                    break;
                case 1:
                    // Check if the date is within the last 30 days
                    if ((today - taskDate) / (1000 * 3600 * 24) <= 30) {
                        taskGroups[currentGroup].tasks.push(task);
                    } else {
                        currentGroup++;
                    }
                    break;
                default:
                    taskGroups[currentGroup].tasks.push(task);
            }
        });

        return taskGroups;
    }
}
