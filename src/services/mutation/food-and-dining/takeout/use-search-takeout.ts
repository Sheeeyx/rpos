import { useMutation } from 'react-query';
import { request } from '../../../api/api';


const useSearchTakeout = () =>
  useMutation((takeout) =>
    request.private.get(`food_dining/take_out/?search=${takeout}`,).then((res) => res.data)
  );

export default useSearchTakeout;
