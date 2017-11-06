import {MyBooks} from './components/pages/MyBooks';
import {Form} from './components/pages/Form';
import {Browse} from './components/pages/Browse';
import {Details} from './components/pages/Details';
import {Search} from './components/pages/Search';

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
    path: '/search/:query',
    component: Search
}, {
    path: '/',
    component: Browse
}];
