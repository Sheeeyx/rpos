import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useUpdateTakeoutMenu = (menuId:number) =>
  useMutation((data) =>
    request.private.put(`food_dining/take_out/menu/${menuId}/`, data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`menu-take_out-${menuId}`);
        
          queryClient.setQueryData(`menu-take_out-${menuId}`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useUpdateTakeoutMenu;
