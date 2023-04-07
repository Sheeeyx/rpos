import { useMutation } from 'react-query';
import { request } from '../../../api/api';


const useSearchFoodService = () =>
  useMutation((restaurant) =>
    request.private.get(`food_dining/food_service/?search=${restaurant}`).then((res) => res.data)
  );

export default useSearchFoodService;
