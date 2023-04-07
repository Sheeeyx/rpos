import { useMutation } from 'react-query';
import {request} from '../../../../api/api';


const useGetBakeryMealList = () =>
  useMutation((id) =>
  request.private.get(`food_dining/bakery_meal/?menu=${id}`).then((res) => res.data)
  );

export default useGetBakeryMealList;