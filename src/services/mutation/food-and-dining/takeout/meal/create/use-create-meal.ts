import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useCreateTakeOutMeal = (id:number) =>
  useMutation((data) =>
    request.private.post('/food_dining/take_out/meal/', data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`menu-take_out-${id}`);
        
          queryClient.setQueryData(`menu-take_out-${id}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useCreateTakeOutMeal;
