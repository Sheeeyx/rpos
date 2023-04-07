import { useMutation } from 'react-query';
import queryClient from '../../configs/react-query.config';
import {request} from '../api/api';



const useCreateRestaurantMeal = (id:number) =>
  useMutation((data) =>
    request.private.post('food_dining/restaurant/meal/', data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`menu-restaurant-${id}`);
        
          queryClient.setQueryData(`menu-restaurant-${id}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useCreateRestaurantMeal;
