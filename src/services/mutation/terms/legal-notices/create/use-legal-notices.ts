import { useMutation } from 'react-query';
import {request} from '../../../../api/api';

interface LegalTypes {
    description: string;
}

const useLegalNotices = () =>
  useMutation((data) =>
    request.private.post<LegalTypes>('terms/legal_notices/', data).then((res) => res.data)
  );

export default useLegalNotices;
