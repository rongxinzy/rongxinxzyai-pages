import { useEffect, useRef, useState } from 'react';
import type { SiteLocale } from '../shared/site-types';
import type { EditorialCopy } from './copy';
import { demoCopy } from './copy';
import { DemoMessage, readDemoMessage } from '../live-demo/constants';

export function Showcase({ copy, locale }: { copy: EditorialCopy; locale: SiteLocale }) {
  const text = demoCopy(locale);
  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [booting, setBooting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [revision, setRevision] = useState(0);

  function send(type: string) {
    frame.current?.contentWindow?.postMessage({ type }, window.location.origin);
  }

  useEffect(() => {
    function receive(event: MessageEvent<unknown>) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow)
        return;
      const message = readDemoMessage(event.data);
      if (message?.type === DemoMessage.Booting) {
        setBooting(true);
        setReady(false);
        setFailed(false);
      } else if (message?.type === DemoMessage.Ready) {
        setReady(true);
        setFailed(false);
      } else if (message?.type === DemoMessage.Error) {
        setFailed(true);
      }
    }
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, []);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        setStarted(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || ready || failed) return;
    const timeout = window.setTimeout(() => setFailed(true), 20000);
    return () => window.clearTimeout(timeout);
  }, [started, ready, failed, revision]);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      // Preserve readable desktop controls on phones with local horizontal scrolling.
      const width = entry.contentRect.width < 768 ? 1280 : entry.contentRect.width;
      element.style.setProperty('--demo-canvas-width', `${width}px`);
      element.style.setProperty('--demo-scale', String(width / 1280));
      element.style.setProperty('--demo-height', `${width * 0.625}px`);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function retry() {
    setReady(false);
    setBooting(false);
    setFailed(false);
    setRevision(value => value + 1);
  }

  return (
    <section id="workbench" aria-labelledby="workbench-title" className="bg-ground py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="workbench-title"
            className="text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            {copy.showcaseTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
            {copy.showcaseLead}
          </p>
        </div>
        <div className="demo-window mt-10 overflow-hidden rounded-2xl bg-ground shadow-xl md:mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3 md:px-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-sm font-medium text-ink">{text.title}</h3>
              <span className="text-[length:var(--fs-micro)] text-muted">{text.sample}</span>
            </div>
            <div className="flex items-center gap-1">
              {started && (
                <button
                  type="button"
                  className="demo-control"
                  onClick={() => send(DemoMessage.Reset)}
                  disabled={!ready}
                >
                  {text.reset}
                </button>
              )}
            </div>
          </div>
          <div ref={stage} className="demo-stage" data-lenis-prevent>
            {started && (
              <>
                <div className="demo-canvas">
                  <iframe
                    key={`${locale}-${revision}`}
                    ref={frame}
                    src={`/client-demo/index.html?locale=${locale}`}
                    title={text.title}
                    sandbox="allow-scripts allow-same-origin allow-forms"
                    referrerPolicy="no-referrer"
                    className="demo-frame"
                    aria-busy={!ready}
                    onError={() => setFailed(true)}
                  />
                </div>
                {((!ready && !booting) || failed) && (
                  <div className="demo-loading" role="status">
                    {failed ? (
                      <p>{text.error}</p>
                    ) : (
                      <>
                        <img
                          className="demo-boot-logo"
                          src="/client-demo/zhiyuan-logo-light-1600.png"
                          alt=""
                        />
                        <p className="sr-only">{text.loading}</p>
                      </>
                    )}
                    {failed && (
                      <button type="button" className="demo-control" onClick={retry}>
                        {text.retry}
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="mx-auto mt-5 w-full text-center" aria-live="polite">
          <p className="demo-description text-sm leading-6 text-muted">
            {copy.showcaseCards[0].desc}
          </p>
          <p className="mt-2 text-[length:var(--fs-micro)] text-muted md:hidden">{text.mobile}</p>
        </div>
      </div>
    </section>
  );
}
