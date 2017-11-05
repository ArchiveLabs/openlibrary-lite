import {MyBooks} from './components/pages/MyBooks';
import {Form} from './components/pages/Form';
import {Browse} from './components/pages/Browse';
import {Details} from './components/pages/Details';

export const routes = [{
    path: '/mybooks/',
    component: MyBooks
}, {
    path: '/form/',
    component: Form
}, {
    path: '/details/:identifier',
    component: Details
}, {
    path: '/',
    component: Browse
}];
