import { useMutation } from 'react-query';
import {request} from '../../../../api/api';


const useGetFoodServiceMealList = () =>
  useMutation((id) =>
  request.private.get(`food_dining/food_service/meal/?menu=${id}`).then((res) => res.data)
  );

export default useGetFoodServiceMealList;
