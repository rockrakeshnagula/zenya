import { Toaster } from 'react-hot-toast';

export const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#151518",
          color: "#ffffff",
          border: "1px solid #2c2c31",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          fontSize: "0.875rem",
        },
        success: {
          style: {
            borderLeft: "4px solid #10b981",
          },
          iconTheme: {
            primary: '#10b981',
            secondary: '#151518',
          },
        },
        error: {
          style: {
            borderLeft: "4px solid #ef4444",
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#151518',
          },
        },
      }}
    />
  );
};