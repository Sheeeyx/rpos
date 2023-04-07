import { useMutation } from 'react-query';
import {request} from '../../../../api/api';



const useCreateChabad = () =>
  useMutation((data) =>
    request.private.post('chabad/', data).then((res) => res.data)
  );

export default useCreateChabad;



