import { useMutation } from 'react-query';
import {request} from '../../../../api/api';



const useCreateSupermarkets = () =>
  useMutation((data) =>
    request.private.post('food_dining/supermarket/create/', data).then((res) => res.data)
  );

export default useCreateSupermarkets;

