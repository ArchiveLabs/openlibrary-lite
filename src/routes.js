import {MyBooks} from './components/pages/MyBooks';
import {Form} from './components/pages/Form';
import {Browse} from './components/pages/Browse';

export const routes = [{
    path: '/mybooks/',
    component: MyBooks
}, {
    path: '/form/',
    component: Form
}, {
    path: '/',
    component: Browse
}];
