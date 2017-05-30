import {extend} from 'flarum/extend';
import app from 'flarum/app';
import TasksPage from 'flagrow/bazaar/components/TasksPage';

export default function () {
    app.routes['flagrow-bazaar-tasks'] = {path: '/flagrow/bazaar/tasks', component: TasksPage.component()};
}
