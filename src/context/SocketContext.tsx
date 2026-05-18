import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { env } from '@/config/env';
import { getToken } from '@/lib/token';

interface SocketContextType { socket: WebSocket | null; }
const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    const ws = new WebSocket(`${env.WS_URL}?token=${token}`);
    socketRef.current = ws;
    return () => ws.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
