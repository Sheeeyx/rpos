import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useUpdateRestaurantMeal = (menuId:number, mealId:number) =>
  useMutation((data) =>
    request.private.put(`food_dining/restaurant/meal/${mealId}/`, data).then((res) => res.data),
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

export default useUpdateRestaurantMeal;
