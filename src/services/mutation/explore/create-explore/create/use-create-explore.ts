import { useMutation } from 'react-query';
import {request} from '../../../../api/api';



const useCreateExplore = () =>
  useMutation((data) =>
    request.private.post('explore/exp/', data).then((res) => res.data)
  );

export default useCreateExplore;
