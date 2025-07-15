import { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const showNotification = (msg) => {
    setMessage(msg);
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {show && (
        <div className="fixed top-4 right-4 bg-sky-300 text-white px-4 py-2 rounded shadow-lg z-50">
          ✅ {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
