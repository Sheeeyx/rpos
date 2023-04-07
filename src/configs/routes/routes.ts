import { LoginPage } from './../../page/login';
import { Dashboard, FoodAndDining} from "../../page";
import { PrimaryLayout } from '../../layouts/primary-layout/PrimaryLayout';
import { Users } from '../../page/Users/Users';

export const dashboardRoutes = [
  {
    path: '/dashboard' ,
    component: Dashboard,
    name: "Dashboard",
    showAlways: true,
  },
  // {
  //   path: '/food-and-dining/*',
  //   component: FoodAndDining,
  //   name: "Food & Dining",
  //   showAlways: true,
  // },
  // {
  //   path: '/terms/*',
  //   component: Terms,
  //   name: "Terms",
  //   showAlways: true,
  // },
  // {
  //   path: '/help/*',
  //   component: Help,
  //   name: "Help",
  //   showAlways: true,
  // },
  // {
  //   path: '/explore/*',
  //   component: MainExplore,
  //   name: "Explore",
  //   showAlways: true,
  // },
  // {
  //   path: '/jewish-resources/*',
  //   component: JewishResources,
  //   name: "JewishResources",
  //   showAlways: true,
  // },
  // {
  //   path: '/advert/*',
  //   component: Advert,
  //   name: "Advert",
  //   showAlways: true,
  // },
  // {
  //   path: '/voice-matters/*',
  //   component: VoiceMatters,
  //   name: "VoiceMatters",
  //   showAlways: true,
  // },
  {
    path: '/users/*',
    component: Users,
    name: "Пользователи",
    showAlways: true,
  },
  // {
  //   path: '/about-app/*',
  //   component: AboutApp,
  //   name: "About App",
  //   showAlways: true,
  // },
];
export const baseRoutes = [
  {
    path: '/login',
    component: LoginPage,
    name: "login",
    noAuth: true,
  },
  {
    path: '/*',
    component: PrimaryLayout,
    name: "Main Layout",
  },
];