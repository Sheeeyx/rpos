  import { useMutation } from 'react-query';
import {request} from '../api/api';


const useGetRestaurantMealList = () =>
  useMutation((id) =>
  request.private.get(`food_dining/restaurant/meal/?menu=${id}`).then((res) => res.data)
  );

export default useGetRestaurantMealList;
