import { useMutation } from 'react-query';
import {request} from '../../../../../api/api';



const useCreateSuperMarketMenu = () =>
  useMutation((data) =>
    request.private.post('food_dining/supermarket_menu/', data).then((res) => res.data)
  );

export default useCreateSuperMarketMenu;
