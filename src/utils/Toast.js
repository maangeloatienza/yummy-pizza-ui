import { toast } from 'react-toastify';

export default function toaster(message){
    return (message.success) ? toast.success(message.message) : toast.error(message.error.message);
}