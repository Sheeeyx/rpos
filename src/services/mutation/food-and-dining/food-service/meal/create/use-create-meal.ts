import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useCreateFoodServiceMeal = (id:number) =>
  useMutation((data) =>
    request.private.post('/food_dining/food_service/meal/', data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`menu-food_service-${id}`);
        
          queryClient.setQueryData(`menu-food_service-${id}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useCreateFoodServiceMeal;
