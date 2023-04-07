import { useMutation } from 'react-query';
import {request} from '../../../../../api/api';



const useCreateFoodServiceMenu = () =>
  useMutation((data) =>
    request.private.post('food_dining/food_service/menu/', data).then((res) => res.data)
  );

export default useCreateFoodServiceMenu;
