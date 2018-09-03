import * as Loadable from 'react-loadable';
import { Loading } from '@/components';

const handleloadableComponent = (component: () => Promise<any>) =>
  Loadable({
    loader: component,
    loading: Loading
  });

export const loadableComponents = {
  Home: handleloadableComponent(() => import(/* webpackChunkName: "home" */ '@/containers/views/Home')),
  SettingBlog: handleloadableComponent(() =>
    import(/* webpackChunkName: "settingBlog" */ '@/containers/views/Setting/Blog')
  ),
  SettingAdmin: handleloadableComponent(() =>
    import(/* webpackChunkName: "settingAdmin" */ '@/containers/views/Setting/Admin')
  )
};

export type loadableComponentsTypeKeys = keyof typeof loadableComponents;

export interface IMenu {
  key: string;
  parentKey?: string;
  title: string;
  icon: string;
  path?: string;
  component?: loadableComponentsTypeKeys;
  exact?: boolean;
}

export interface IMenuTree extends IMenu {
  children?: IMenu[];
}

export const menu: IMenu[] = [
  {
    key: '1',
    title: 'Home',
    icon: 'home',
    path: '/',
    component: 'Home',
    exact: true
  },
  {
    key: '2',
    title: 'Setting',
    icon: 'setting'
  },
  {
    key: '21',
    parentKey: '2',
    title: 'Blog',
    icon: 'home',
    path: '/setting/blog',
    component: 'SettingBlog',
    exact: true
  },
  {
    key: '22',
    parentKey: '2',
    title: 'Admin',
    icon: 'home',
    path: '/setting/admin',
    component: 'SettingAdmin',
    exact: true
  }
];