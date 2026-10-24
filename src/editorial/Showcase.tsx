import { useEffect, useRef, useState } from 'react';
import type { SiteLocale } from '../shared/site-types';
import type { EditorialCopy } from './copy';
import { demoCopy } from './copy';
import { DemoMessage, readDemoMessage } from '../live-demo/constants';
import { Icon } from './icons';

export function Showcase({ copy, locale }: { copy: EditorialCopy; locale: SiteLocale }) {
  const text = demoCopy(locale);
  const windowRef = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [booting, setBooting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [slow, setSlow] = useState(false);
  const [warning, setWarning] = useState(false);
  const [revision, setRevision] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function send(type: string) {
    frame.current?.contentWindow?.postMessage({ type }, window.location.origin);
  }

  function toggleFullscreen() {
    if (!isFullscreen) {
      if (windowRef.current?.requestFullscreen && document.fullscreenEnabled) {
        windowRef.current.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  }

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isFullscreen]);

  useEffect(() => {
    function receive(event: MessageEvent<unknown>) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow)
        return;
      const message = readDemoMessage(event.data);
      if (message?.type === DemoMessage.Booting) {
        setBooting(true);
        setReady(false);
        setFailed(false);
        setSlow(false);
        setWarning(false);
      } else if (message?.type === DemoMessage.Ready) {
        setReady(true);
        setFailed(false);
        setSlow(false);
        setWarning(false);
      } else if (message?.type === DemoMessage.Error) {
        setFailed(true);
      } else if (message?.type === DemoMessage.Warning) {
        setWarning(true);
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
    const timeout = window.setTimeout(() => setSlow(true), 20000);
    return () => window.clearTimeout(timeout);
  }, [started, ready, failed, revision]);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const containerWidth = entry.contentRect.width;
      const containerHeight = entry.contentRect.height;
      const isMobile = window.innerWidth < 768 || containerWidth < 640;

      if (isFullscreen) {
        const stageWidth = containerWidth || window.innerWidth;
        const stageHeight = containerHeight || window.innerHeight - 56;
        const scaleX = stageWidth / 1280;
        const scaleY = stageHeight / 800;
        const fitScale = Math.min(scaleX, scaleY);
        const scale = fitScale >= 1 ? 1 : Math.max(0.5, fitScale);
        const canvasWidth = stageWidth > 1280 * scale ? stageWidth : 1280 * scale;
        const canvasHeight = stageHeight > 800 * scale ? stageHeight : 800 * scale;
        element.style.setProperty('--demo-canvas-width', `${Math.round(canvasWidth)}px`);
        element.style.setProperty('--demo-scale', String(scale));
        element.style.setProperty('--demo-height', `${Math.round(canvasHeight)}px`);
        element.style.setProperty('--demo-frame-height', '800px');
      } else if (isMobile) {
        const mobileHeight = Math.min(520, Math.max(400, Math.round(window.innerHeight * 0.58)));
        element.style.setProperty('--demo-canvas-width', '1280px');
        element.style.setProperty('--demo-scale', '1');
        element.style.setProperty('--demo-height', `${mobileHeight}px`);
        element.style.setProperty('--demo-frame-height', `${mobileHeight}px`);
      } else if (containerWidth >= 1280) {
        element.style.setProperty('--demo-canvas-width', '1280px');
        element.style.setProperty('--demo-scale', '1');
        element.style.setProperty('--demo-height', '800px');
        element.style.setProperty('--demo-frame-height', '800px');
      } else {
        const scale = containerWidth / 1280;
        const height = Math.round(containerWidth * 0.625);
        element.style.setProperty('--demo-canvas-width', `${Math.round(containerWidth)}px`);
        element.style.setProperty('--demo-scale', String(scale));
        element.style.setProperty('--demo-height', `${height}px`);
        element.style.setProperty('--demo-frame-height', '800px');
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [isFullscreen]);

  function retry() {
    setReady(false);
    setBooting(false);
    setFailed(false);
    setSlow(false);
    setWarning(false);
    setRevision(value => value + 1);
  }

  return (
    <section id="workbench" aria-labelledby="workbench-title" className="bg-ground py-24 md:py-32">
      <div className="mx-auto max-w-7xl xl:max-w-[1328px] px-4 sm:px-6">
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
        <div
          ref={windowRef}
          className={`demo-window mt-10 overflow-hidden rounded-2xl bg-ground shadow-xl md:mt-12 ${
            isFullscreen ? 'is-fullscreen' : ''
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3 md:px-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-sm font-medium text-ink">{text.title}</h3>
              <span className="text-[length:var(--fs-micro)] text-muted">{text.sample}</span>
            </div>
            <div className="flex items-center gap-1">
              {!failed && (slow || warning) && (
                <span role="status" className="text-[length:var(--fs-micro)] text-muted">
                  {slow ? text.slowLoading : text.runtimeIssue}
                </span>
              )}
              {slow && !failed && (
                <button type="button" className="demo-control" onClick={retry}>
                  {text.retry}
                </button>
              )}
              {started && (
                <button
                  type="button"
                  className="demo-control"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? text.collapse : text.expand}
                  aria-label={isFullscreen ? text.collapse : text.expand}
                >
                  <Icon name={isFullscreen ? 'minimize' : 'maximize'} size={15} />
                  <span className="hidden sm:inline">
                    {isFullscreen ? text.collapse : text.expand}
                  </span>
                </button>
              )}
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
        <div className="mx-auto mt-5 w-full max-w-3xl text-center" aria-live="polite">
          <p className="demo-description text-sm leading-6 text-muted">
            {copy.showcaseCards[0].desc}
          </p>
          {copy.showcaseCards[4] ? (
            <p className="mt-3 text-sm leading-6 text-muted">
              <span className="font-medium text-ink">{copy.showcaseCards[4].title}</span>
              {' · '}
              {copy.showcaseCards[4].desc}
            </p>
          ) : null}
          <p className="mt-2 text-[length:var(--fs-micro)] text-muted md:hidden">{text.mobile}</p>
        </div>
      </div>
    </section>
  );
}
