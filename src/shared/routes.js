// Components
import Home from '../app/components/home/Home';
import About from '../app/components/about/About';

// Containers
import Blog from '../app/containers/blog/Blog';

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
