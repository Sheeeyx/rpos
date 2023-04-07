import { useMutation } from 'react-query';
import {request} from '../../../../api/api';

const useCreateTakeout = () =>
  useMutation((data) =>
    request.private.post('food_dining/take_out/create/', data).then((res) => res.data)
  );

export default useCreateTakeout;

