import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Extension from './models/Extension';
import Task from './models/Task';
import addBazaarPage from './addBazaarPage';
import addTasksPage from './addTasksPage';

app.initializers.add('extiverse-bazaar', app => {
    app.store.models['bazaar-extensions'] = Extension;
    app.store.models['bazaar-tasks'] = Task;

    addBazaarPage();
    addTasksPage();
});
