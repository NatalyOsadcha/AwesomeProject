import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export default function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Posts';

  switch (routeName) {
    case 'Posts':
      return 'Posts';
    case 'Create posts':
      return 'Create posts';
    case 'Profile':
      return 'My profile';
  }
}