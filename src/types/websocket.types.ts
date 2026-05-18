export interface SocketEvent<T = unknown> {
  type: string;
  payload: T;
  timestamp: string;
}
