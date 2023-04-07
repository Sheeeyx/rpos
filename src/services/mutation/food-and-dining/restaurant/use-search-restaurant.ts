import { useMutation } from 'react-query';
import { request } from '../../../api/api';


const useSearchRestaurant = () =>
  useMutation((restaurant) =>
    request.private.get(`food_dining/restaurant/?search=${restaurant}`,).then((res) => res.data)
  );

export default useSearchRestaurant;
