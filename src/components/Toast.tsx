type ToastType = 'success' | 'warning' | 'error';

type ToastProps = {
  message: string;
  type?: ToastType;
};

const toastStyles: Record<ToastType, string> = {
  success: 'bg-green-100 text-green-700 border-green-300',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  error: 'bg-red-100 text-red-700 border-red-300',
};

const Toast = ({ message, type = 'success' }: ToastProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`border px-4 py-3 rounded-md shadow-md ${toastStyles[type]}`}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
