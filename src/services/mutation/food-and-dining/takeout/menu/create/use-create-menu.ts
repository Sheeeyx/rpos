import { useMutation } from 'react-query';
import {request} from '../../../../../api/api';



const useCreateTakeOutMenu = () =>
  useMutation((data) =>
    request.private.post('food_dining/take_out/menu/', data).then((res) => res.data)
  );

export default useCreateTakeOutMenu;
