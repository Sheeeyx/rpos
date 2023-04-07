import { useMutation } from 'react-query';
import {request} from '../../../../api/api';


const useGetSuperMarketMealList = () =>
  useMutation((id) =>
  request.private.get(`food_dining/supermarket_meal/?menu=${id}`).then((res) => res.data)
  );

export default useGetSuperMarketMealList;
