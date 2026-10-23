import './mock-bridge';
import '@client/index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@client/App';
import { store } from '@client/store';
import { hydrateRuns } from '@client/store/slices/activitySlice';
import { clearLoadingSessionId, setLoadingSessionId } from '@client/store/slices/coworkSlice';
import { coworkService } from '@client/services/cowork';
import { activityRuns, sessions } from './sample-data';
import { DemoMessage, DemoScene, readDemoMessage } from '../live-demo/constants';
import { installDemoNavigationBoundary } from './navigation-boundary';

installDemoNavigationBoundary();

const notify = (type: string, scene?: DemoScene) =>
  window.parent.postMessage({ type, scene }, location.origin);

// Reveal the actual App's ParticleBootScreen as soon as it mounts. The host
// must not cover it with its generic loading overlay while waiting for Ready.
const bootObserver = new MutationObserver(() => {
  if (!document.querySelector('#root [role="status"] canvas, #root [role="status"] img')) return;
  notify(DemoMessage.Booting);
  bootObserver.disconnect();
});
bootObserver.observe(document.getElementById('root')!, { childList: true, subtree: true });

// The first post-boot view is the native session skeleton, never the empty home.
store.dispatch(setLoadingSessionId(sessions[0].id));
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
store.dispatch(hydrateRuns(activityRuns));

function clickNamed(pattern: RegExp, selector = 'aside button') {
  const button = Array.from(document.querySelectorAll<HTMLButtonElement>(selector)).find(node =>
    pattern.test(node.getAttribute('aria-label') || node.textContent?.trim() || ''),
  );
  button?.click();
  return Boolean(button);
}

function waitForControl(pattern: RegExp, selector: string): Promise<void> {
  return new Promise(resolve => {
    if (clickNamed(pattern, selector)) {
      resolve();
      return;
    }
    const observer = new MutationObserver(() => {
      if (!clickNamed(pattern, selector)) return;
      observer.disconnect();
      resolve();
    });
    observer.observe(document.body, { subtree: true, childList: true });
    window.setTimeout(() => {
      observer.disconnect();
      resolve();
    }, 5000);
  });
}

async function navigate(scene: DemoScene) {
  if (scene === DemoScene.Models) {
    clickNamed(/^本地推理$|^Local Inference$/i);
    await waitForControl(/模型市场|Marketplace|Model Market/i, '[role="tab"]');
  } else if (scene === DemoScene.Skills) {
    clickNamed(/^专家$|^Expert$/i);
    await waitForControl(/^技能$|^Skills$/i, '[role="tab"]');
  } else if (scene === DemoScene.Workspace) clickNamed(/^新建任务$|^New Task$/i);
  else {
    const id = sessions[0].id;
    store.dispatch(setLoadingSessionId(id));
    try {
      await coworkService.loadSession(id);
    } finally {
      store.dispatch(clearLoadingSessionId(id));
    }
  }
  notify(DemoMessage.Changed, scene);
}

window.addEventListener('message', event => {
  if (event.source !== window.parent || event.origin !== location.origin) return;
  const message = readDemoMessage(event.data);
  if (message?.type === DemoMessage.Reset) location.reload();
  else if (message?.type === DemoMessage.Navigate && message.scene) void navigate(message.scene);
});
const ready = window.setInterval(() => {
  if (!document.querySelector('aside') || !store.getState().cowork.sessions.length) return;
  window.clearInterval(ready);
  bootObserver.disconnect();
  void navigate(DemoScene.Conversation)
    .then(() => notify(DemoMessage.Ready))
    .catch(error => {
      console.error('[ClientDemo] Initial session failed to load:', error);
      notify(DemoMessage.Error);
    });
}, 100);

window.addEventListener('error', event => {
  // Chromium defers ResizeObserver notifications during the client's expand
  // animation. This browser diagnostic has no exception and is not an App crash.
  if (
    !event.error &&
    (event.message === 'ResizeObserver loop completed with undelivered notifications.' ||
      event.message === 'ResizeObserver loop limit exceeded')
  )
    return;
  notify(DemoMessage.Error);
});
window.addEventListener('unhandledrejection', () => notify(DemoMessage.Error));
