import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Extension from 'flagrow/bazaar/models/Extension';
import Task from 'flagrow/bazaar/models/Task';
import addBazaarPage from 'flagrow/bazaar/addBazaarPage';
import addTasksPage from 'flagrow/bazaar/addTasksPage';

app.initializers.add('flagrow-bazaar', app => {
    app.store.models['bazaar-extensions'] = Extension;
    app.store.models['bazaar-tasks'] = Task;

    addBazaarPage();
    addTasksPage();
});
