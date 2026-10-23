import { showAppInfoToast } from '@client/services/toastNotification';
import { words } from './sample-data';

export function desktopOnly(): string {
  const message = words.desktopOnly;
  showAppInfoToast(message);
  return message;
}

export function operationFailed(path: string, error: unknown): string {
  console.error(`[ClientDemo] Mock operation ${path} failed:`, error);
  const message = words.operationFailed;
  showAppInfoToast(message);
  return message;
}
