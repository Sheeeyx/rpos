import { useMutation } from 'react-query';
import {request} from '../../../../api/api';

const useCreateBakery = () =>
  useMutation((data) =>
    request.private.post('food_dining/bakery/create/', data).then((res) => res.data)
  );

export default useCreateBakery;

