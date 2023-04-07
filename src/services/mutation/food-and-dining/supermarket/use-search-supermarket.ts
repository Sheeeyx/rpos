import { useMutation } from 'react-query';
import { request } from '../../../api/api';


const useSearchSupermarkets = () =>
  useMutation((supermarkets) =>
    request.private.get(`food_dining/supermarket/list/?search=${supermarkets}`,).then((res) => res.data)
  );

export default useSearchSupermarkets;
