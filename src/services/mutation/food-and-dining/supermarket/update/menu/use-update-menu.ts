import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useUpdateSupermarketMenu = (menuId:number) =>
  useMutation((data) =>
    request.private.put(`food_dining/supermarket_menu/${menuId}/`, data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`menu-supermarket-${menuId}`);
        
          queryClient.setQueryData(`menu-supermarket-${menuId}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useUpdateSupermarketMenu;
