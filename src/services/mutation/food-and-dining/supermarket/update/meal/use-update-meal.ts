import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useUpdateSupermarketMeal = (menuId:number, mealId:number) =>
  useMutation((data) =>
    request.private.put(`food_dining/supermarket_meal/${mealId}/`, data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`meal-supermarket-${mealId}`);
        
          queryClient.setQueryData(`meal-supermarket-${mealId}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useUpdateSupermarketMeal;
