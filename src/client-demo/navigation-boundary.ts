import { desktopOnly } from './boundary-notice';

export function installDemoNavigationBoundary() {
  document.addEventListener(
    'click',
    event => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      // Transcript fragment links may still scroll within the current document.
      if (href.startsWith('#') && !link.hasAttribute('download')) return;
      event.preventDefault();
      desktopOnly();
    },
    true,
  );
}
