import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useUpdateBakeryMenu = (menuId:number) =>
  useMutation((data) =>
    request.private.put(`food_dining/bakery_menu/${menuId}/`, data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`menu-bakery-${menuId}`);
        
          queryClient.setQueryData(`menu-bakery-${menuId}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useUpdateBakeryMenu;
