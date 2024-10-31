import {useNavigate} from 'react-router-dom';

export const useNavBack = () => {
    const navigate = useNavigate();
    return () => navigate(-1);
};