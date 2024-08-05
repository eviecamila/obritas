// /services/shared/Toastr.service.jsx
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastrService = {
    autoClose: 3000,
    success: (message, options = {}) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose, ...options,
        });
    },
    error: (message, options = {}) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose, ...options,
        });
    },
    info: (message, options = {}) => {
        toast.info(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose, ...options,
        });
    },
    warn: (message, options = {}) => {
        toast.warn(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose, ...options,
        });
    },
};

export default ToastrService;
