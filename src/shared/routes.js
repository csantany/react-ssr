import Home from 'components/home/Home';
import About from 'components/about/About';
import Blog from 'components/blog/Blog';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/blog',
    component: Blog
  }
];

export default routes;
