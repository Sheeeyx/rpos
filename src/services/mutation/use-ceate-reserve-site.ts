import { useMutation } from 'react-query';
import {request} from '../api/api';



const useCreateReserveSite = () =>
  useMutation((data) =>
    request.private.post('food_dining/reserve_site_link/', data).then((res) => res.data)
  );

export default useCreateReserveSite;



