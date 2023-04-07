import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useCreateSupermarketMeal = (id:number) =>
  useMutation((data) =>
    request.private.post('food_dining/supermarket_meal/', data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`menu-supermarket-${id}`);
        
          queryClient.setQueryData(`menu-supermarket-${id}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useCreateSupermarketMeal;
