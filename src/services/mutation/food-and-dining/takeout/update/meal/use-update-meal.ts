import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useUpdateTakeoutMeal = (menuId:number, mealId:number) =>
  useMutation((data) =>
    request.private.put(`food_dining/take_out/meal/${mealId}/`, data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`meal-take_out-${mealId}`);
        
          queryClient.setQueryData(`meal-take_out-${mealId}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useUpdateTakeoutMeal;
