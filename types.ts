export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum AppState {
  UPLOAD = 'UPLOAD',
  VIEWER = 'VIEWER',
}
