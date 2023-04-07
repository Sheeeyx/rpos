import { useMutation } from 'react-query';
import {request} from '../api/api';



const useCreateRestaurantMenu = () =>
  useMutation((data) =>
    request.private.post('food_dining/restaurant/menu/', data).then((res) => res.data),
    
  );


export default useCreateRestaurantMenu;
