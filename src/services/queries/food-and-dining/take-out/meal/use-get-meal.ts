import { useMutation } from 'react-query';
import {request} from '../../../../api/api';


const useGetTakeOutMealList = () =>
  useMutation((id) =>
  request.private.get(`food_dining/take_out/meal/?menu=${id}`).then((res) => res.data)
  );

export default useGetTakeOutMealList;
