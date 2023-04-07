import { useMutation } from 'react-query';
import queryClient from '../../../../configs/react-query.config';
import {request} from '../../../api/api';



const useCreateAboutApp = () =>
  useMutation((data) =>
    request.private.post('terms/about_app/', data).then((res) => res.data),
    {
      onMutate: () => {
         
          const menu = queryClient.getQueryData(`about-app`);
        
          queryClient.setQueryData(`about-app`, (prev: any) => {
              if (!prev) return menu;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useCreateAboutApp;
