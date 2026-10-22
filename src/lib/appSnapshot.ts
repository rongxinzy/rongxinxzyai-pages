// 产品截图以静态 HTML 快照嵌入（sandbox iframe，无脚本）。快照按 1280×800 的
// 应用窗口排版，这里把容器宽度换算成缩放比写进 --snap-scale，由 CSS 缩放 iframe。
export const SNAPSHOT_WIDTH = 1280;

export function fitSnapshots(root: ParentNode | null): () => void {
  if (!root || typeof ResizeObserver === "undefined") return () => {};
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      (entry.target as HTMLElement).style.setProperty(
        "--snap-scale",
        String(entry.contentRect.width / SNAPSHOT_WIDTH),
      );
    }
  });
  root.querySelectorAll<HTMLElement>(".app-snapshot").forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
