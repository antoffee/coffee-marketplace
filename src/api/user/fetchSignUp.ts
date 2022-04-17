import axios from 'api/axios';
import { SignUpRequest, USER_ROUTES } from 'api/routes/userApi';

export const fetchSignUp1 = async (request: SignUpRequest): Promise<unknown> => {
    return await axios.post<unknown>(`${USER_ROUTES.signup()}`, request).then((response) => response.data);
};
