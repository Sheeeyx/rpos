import { useMutation } from 'react-query';
import {request} from '../../../../api/api';

const useCreateFoodService = () =>
  useMutation((data) =>
    request.private.post('food_dining/food_service/create/', data).then((res) => res.data)
  );

export default useCreateFoodService;

