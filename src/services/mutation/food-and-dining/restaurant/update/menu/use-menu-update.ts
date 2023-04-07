import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useUpdateRestaurantMenu = (menuId:number) =>
  useMutation((data) =>
    request.private.put(`food_dining/restaurant/menu/${menuId}/`, data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`menu-restaurant-${menuId}`);
        
          queryClient.setQueryData(`menu-restaurant-${menuId}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useUpdateRestaurantMenu;
