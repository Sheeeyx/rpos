import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useUpdateFoodServiceMeal = (menuId:number, mealId:number) =>
  useMutation((data) =>
    request.private.put(`food_dining/food_service/meal/${mealId}/`, data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`meal-food_service-${mealId}`);
        
          queryClient.setQueryData(`meal-food_service-${mealId}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useUpdateFoodServiceMeal;
