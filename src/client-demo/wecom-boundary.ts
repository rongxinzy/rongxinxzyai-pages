import { desktopOnly } from './boundary-notice';

// The native SDK opens an authentication popup before reaching the preload
// bridge. Keep that side effect within the same desktop-only boundary.
export default {
  async openBotInfoAuthWindow(): Promise<null> {
    desktopOnly();
    return null;
  },
};
