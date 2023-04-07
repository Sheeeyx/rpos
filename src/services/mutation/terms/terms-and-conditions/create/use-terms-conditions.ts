import { useMutation } from 'react-query';
import {request} from '../../../../api/api';

const useTermsconditions = () =>
  useMutation((data) =>
    request.private.post('terms/terms_conditions/', data).then((res) => res.data)
  );

export default useTermsconditions;
