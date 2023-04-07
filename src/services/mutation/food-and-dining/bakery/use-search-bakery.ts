import { useMutation } from 'react-query';
import { request } from '../../../api/api';


const useSearchBakery = () =>
  useMutation((bakery) =>
    request.private.get(`food_dining/bakery/list/?search=${bakery}`,).then((res) => res.data)
  );

export default useSearchBakery;
