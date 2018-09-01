import {extend} from 'flarum/extend';
import app from 'flarum/app';
import TasksPage from './components/TasksPage';

export default function () {
    app.routes['flagrow-bazaar-tasks'] = {path: '/flagrow/bazaar/tasks', component: TasksPage.component()};
}
