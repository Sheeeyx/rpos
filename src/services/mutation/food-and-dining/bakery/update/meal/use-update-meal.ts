import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useUpdateBakeryMeal = (menuId:number, mealId:number) =>
  useMutation((data) =>
    request.private.put(`food_dining/bakery_meal/${mealId}/`, data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`meal-bakery-${menuId}`);
        
          queryClient.setQueryData(`meal-bakery-${menuId}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useUpdateBakeryMeal;
