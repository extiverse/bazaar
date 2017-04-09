import app from 'flarum/app';
import Component from 'flarum/Component';
import TaskRepository from 'flagrow/bazaar/utils/TaskRepository';
import BazaarPageHeader from 'flagrow/bazaar/components/BazaarPageHeader';
import TaskListItem from 'flagrow/bazaar/components/TaskListItem';
import BazaarLoader from 'flagrow/bazaar/components/BazaarLoader';

export default class TasksPage extends Component {
    init() {
        this.loading = m.prop(false);
        this.repository = new TaskRepository(this.loading);
        this.repository.loadNextPage();
        this.loader = BazaarLoader.component({loading: this.loading});
    }

    view() {
        return (
            <div className="ExtensionsPage Bazaar">
                { BazaarPageHeader.component() }

                <div className="ExtensionsPage-list">
                    <div className="container">
                        <table className="TaskPage-table">
                            <thead>
                                <tr>
                                    <th>{ app.translator.trans('flagrow-bazaar.admin.page.task.header.status') }</th>
                                    <th>{ app.translator.trans('flagrow-bazaar.admin.page.task.header.command') }</th>
                                    <th>{ app.translator.trans('flagrow-bazaar.admin.page.task.header.started_at') }</th>
                                    <th>{ app.translator.trans('flagrow-bazaar.admin.page.task.header.finished_at') }</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.repository.tasks().map(task => TaskListItem.component({task: task})) }
                            </tbody>
                        </table>
                    </div>
                </div>
                { this.loader }
            </div>
        );
    }
}
