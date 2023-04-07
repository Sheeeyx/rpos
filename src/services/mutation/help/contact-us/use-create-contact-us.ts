import { useMutation } from 'react-query';
import queryClient from '../../../../configs/react-query.config';
import {request} from '../../../api/api';


interface ContactTypes {
  description: string;
}



const useCreateContactUs = () =>
  useMutation((data) =>
    request.private.post<ContactTypes>('terms/add-contact-us/', data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`contact`);
        
          queryClient.setQueryData(`contact`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useCreateContactUs;
