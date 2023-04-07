import { useMutation } from 'react-query';
import {request} from '../../../../../api/api';



const useCreateBakeryMenu = () =>
  useMutation((data) =>
    request.private.post('food_dining/bakery_menu/', data).then((res) => res.data)
  );

export default useCreateBakeryMenu;
