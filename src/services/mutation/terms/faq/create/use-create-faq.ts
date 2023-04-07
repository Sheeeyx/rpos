import { useMutation } from 'react-query';
import {request} from '../../../../api/api';

interface FaqTypes {
    title: string;
    description: string;
}

const useCreateFaq = () =>
  useMutation((data) =>
    request.private.post<FaqTypes>('terms/faq/', data).then((res) => res.data)
  );

export default useCreateFaq;
