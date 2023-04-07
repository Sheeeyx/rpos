import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useUpdateFoodServiceMenu = (menuId:number) =>
  useMutation((data) =>
    request.private.put(`food_dining/food_service/menu/${menuId}/`, data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`menu-food_service-${menuId}`);
        
          queryClient.setQueryData(`menu-food_service-${menuId}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useUpdateFoodServiceMenu;
