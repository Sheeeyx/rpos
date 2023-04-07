import { useMutation } from 'react-query';
import {request} from '../../../../api/api';



const useCreateResaurant = () =>
  useMutation((data) =>
    request.private.post('food_dining/restaurant/create/', data).then((res) => res.data)
  );

export default useCreateResaurant;
