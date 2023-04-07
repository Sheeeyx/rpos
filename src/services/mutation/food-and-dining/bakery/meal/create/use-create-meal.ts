import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useCreateBakeryMeal = (id:number) =>
  useMutation((data) =>
    request.private.post('/food_dining/bakery_meal/', data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`menu-bakery-${id}`);
        
          queryClient.setQueryData(`menu-bakery-${id}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useCreateBakeryMeal;
