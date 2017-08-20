// Components
import Home from 'components/home/Home';
import About from 'components/about/About';

// Containers
import Blog from 'containers/blog/Blog';

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
