# Website client demo

The homepage `Showcase` mounts `/client-demo/index.html?locale=zh-CN` or `?locale=en` when the demo canvas enters the viewport. A one-shot IntersectionObserver starts the native particle boot; scrolling away and back keeps the same App instance. It uses one iframe, with navigation through the client's sidebar and no outer scene tabs, start button or fullscreen control. The website keeps its existing marketing design system; the iframe uses the client's own components and styling.

## Architecture and source

`src/client-demo/main.tsx` mounts the desktop client's React `App` and Redux store, importing its `index.css`, shared components, theme, dialogs, hover states, and motion. `src/client-demo/client-source.json` pins the repository, revision and default checkout. The current revision is `7a648be8f3562757f14d944c6726ea16bedfe119` (origin/main fetched on 2026-10-23). `ZHIYUAN_CLIENT_SOURCE` can select another installed checkout of that same revision.

`src/client-demo/mock-bridge.ts` defines the browser-local `window.electron` bridge before the App mounts. `feature-mocks.ts` supplies additional coding, automation, expert, and MCP responses. No Electron process runs in the browser. The UI is not mounted from exported HTML or reconstructed with website components.

`scripts/build-client-demo.mjs` extracts the original gallery's model and skill facts from `public/product/zhiyuan-{model-market,skills}[-en].html` into `src/client-demo/gallery.json`. `sample-data.ts` combines those facts with the existing sales-analysis conversation, reasoning, tool calls, report, and workspace examples. The original static gallery remains a data source.

The generated client lives in `public/client-demo/`. Its `source.json` records the source repository, revision, package version and clean-source status. Build, lint, type and browser checks reject a checkout whose revision differs from the pin or whose client inputs have local changes. Updating the website alone does not update the embedded client.

The sidebar renderer correction is applied by `scripts/client-demo-layout-patch.mjs` before JSX compilation. The pinned `AgentTaskRow` absolutely positions its timestamp over the title while reserving space only for action buttons. The patch moves the existing timestamp into the title button's flex flow, with a nonshrinking width and an 8px gap. Existing action space, theme, hover/focus transitions, title clipping/marquee and batch/rename behavior are preserved. The source checkout stays clean; `source.json` records the patch ID, target and patched-source SHA-256. Exact source anchors must match or the build fails. Remove this patch after pinning a client revision with the upstream fix.

`scripts/check-demo-sidebar.mjs` checks both session rows at rest, hover, keyboard focus and menu-open states: the title viewport must end before the timestamp, which must end before the action controls. The check failed against the original bundle (161px title viewport overlapped the 45.8px timestamp by 43.8px). The patched production build passes at DPR 1/2 with normal/reduced motion (`C:/Users/Administrator/AppData/Local/Temp/zhiyuan-demo-interactions-J7Db7S/`). Chinese/English light/dark themes also pass at a 1280×800 client viewport (`C:/Users/Administrator/AppData/Local/Temp/zhiyuan-demo-interactions-SVJrlr/`). Theme verification sets both the client's `data-theme` and light/dark class; toggling the class alone does not change its generated theme tokens. Run just these locale/theme checks with `npm run demo:verify -- --sidebar-only`.

This revision renders thinking and tools directly in transcript order. `TurnBlock.tsx` no longer wraps them in the old execution-count summary. Tool rows expose paths/commands while closed, with localized status and expandable parameters/results. The demo uses these exact source components and recipes; it contains no replacement summary component.

## Interaction scope

- Use the real sidebar to visit work/chat, local inference, coding, todos, automation, activity, experts, skills, and settings. Client controls, dialogs, forms, hover states, and transitions come from the actual App.
- Search and filter sample models, simulate installation, and inspect installed-model state without downloading weights.
- Work retains its sales-analysis and regional-budget examples with native reasoning/tool displays. Chat has separate model-selection and weekly-update conversations, with topic-specific replies and concise follow-ups. Replies do not call a model or perform tools.
- Exercise skill, expert, workspace, todo, schedule, and coding flows backed by in-memory fixtures and mock events. Coding responses and automation runs use sample data; they do not execute code or start a scheduler.
- Switch features through the client sidebar within one App instance, reset its state or retry loading. Mobile keeps a readable 1280×800 canvas with horizontal scrolling inside the window. The explanation beneath the window uses its full available width so desktop text fits on one line; mobile text wraps naturally.

This is a client UI preview with a bounded browser backend. `bridge-boundary.ts` builds an explicit object from the pinned preload contract and registered mocks; unknown properties are absent. Implemented operations may change in-memory fixtures. Generated browser-local getters provide typed empty/default reads. Unimplemented mutations return an unsuccessful or cancelled response and a neutral notice through the client's shared Toast. They cannot inherit the generated preview's optimistic success values. A cancelled log export uses the native protocol's `success: true, canceled: true` envelope, with no file or success notice.

The host states the boundary before interaction. Account connections, QR authorization, bot startup, real inference, filesystem/shell/Git operations, update/runtime installs and external navigation require the desktop app. Model installation and task replies remain explicit sample simulations. External anchors are intercepted before sandbox navigation; the WeCom SDK is replaced at build time with `wecom-boundary.ts` because it opens its auth window outside the preload bridge. No real QR code, confirmed account, popup, network test or operating-system action is fabricated. State is in memory and reset/reload restores the fixtures.

`im-mocks.ts` preserves required nested configuration fields on partial updates. The original shallow merge replaced the entire WeChat configuration when toggling `enabled`, deleting `allowFrom` and causing the native settings page to crash on its next render. In-memory channel instances now have unique IDs and complete generated config shapes. Enabling/connecting a channel is declined, and all status reads stay disconnected. AISphere likewise starts unconfigured. Creation templates are retained separately from mutable session, task, todo, expert and coding-project lists, so deleting the examples does not invalidate later creation.

`local-inference-mocks.ts` checks its handlers against the pinned `LlamaCppApi` contract. The previous load/unload handlers returned only `success`; native hooks assigned the missing `runningModels` to state and the access-settings hook then crashed on `runningModels[0]`. Both actions now return complete snapshots, and unload confirms completion. Repeated start/stop, deleting the last model, reinstalling, cancelling installation and saving preferences preserve consistent in-memory state. Cancelled installation cannot complete later. Launch logs have an honest empty state. Service configuration only accepts validated memory-policy/budget fields.

`scripts/client-demo-capability-patch.mjs` omits logout, native window controls, local runtime/network/model-directory menu items, and OS startup/sleep/proxy/database-backup/desktop-pet settings at compile time. The retained controls remain native; there is no substitute browser UI or CSS hiding. Source anchors and hashes are checked and recorded in `source.json`, and the pinned checkout stays clean. Account transitions are also blocked in the bridge even if a handler is registered. Auto-launch/prevent-sleep changes and real MCP connection tests return controlled refusals. MCP creation keeps an immutable template so it works after deleting every sample server.

Bridge handlers catch synchronous throws and rejected promises and return a controlled operation failure; unexpected errors are still logged. Tests continue to fail on unexpected console errors, page exceptions, external requests or popups. Capability/operation diagnostic events contain method paths and classifications only, never form contents or credentials.

Expected mock refusals preserve the generated native result shape, including arrays and confirmation fields, while setting failure flags and showing the existing neutral notice. Unexpected handler failures remain logged and retain the same shape protection. Operational window errors and unhandled rejections show a nonblocking host status without replacing the App. React root uncaught render errors, failed initial-session startup and iframe document errors retain the fatal failure/retry path. Native lazy-view error boundaries retain their own local retry UI. No global event is prevented or hidden from browser diagnostics.

Sales analysis and regional budget reconciliation have separate prompts, reasoning, tool outputs, and answers. Coding has matching `analyze_q3.py` and `reconcile_budget.py` sessions, with independent reasoning, tool records, completion events, messages and active-lane state. Work follow-ups use the current client's sequenced UI-event protocol.

The sample-data notice belongs outside the iframe. Task answers and operation results use normal product wording without an appended “（演示）” label. Host copy lives in `src/editorial/copy.ts`; the App retains its own i18n.

The App already renders its own `ParticleBootScreen`. A `Booting` message reveals that screen as soon as its canvas (or reduced-motion static logo) mounts; the host no longer covers it while waiting for `Ready`. Before the client bundle is available, the same product logo provides a static placeholder. Reset replays native boot. After 20 seconds without readiness, the host shows a slow-loading status and a retry control while keeping the same iframe loading; a late Ready message completes normally.

`scripts/client-demo-loading-patch.mjs` replaces only CoworkView's intermediate blue LogoLoadingState with the client's own CoworkSessionColdStartSkeleton. The initial session loading ID is selected before App mount; after particle boot, initialization and transcript loading share that native skeleton without flashing the empty home. Ready is sent after the initial session is loaded. This second renderer patch also rejects changed source anchors and records its target and SHA-256 in source.json; the pinned client checkout remains clean.

Home entry sets manual browser scroll restoration before mounting, then positions the viewport in a layout effect before the first App paint. A home URL without a fragment starts at the top even after refreshing from the demo. Explicit section fragments and user-initiated anchor navigation retain their destinations.

## Embedding boundary

`src/live-demo/constants.ts` defines scene and message constants. `Showcase.tsx` and `src/client-demo/main.tsx` validate both the sender window and origin before accepting messages. The iframe enables scripts, same-origin and forms in its sandbox. Forms must be enabled for the client's React submit handlers to receive native submit events. The handlers prevent navigation; entry-page and deployment CSP retain `form-action 'none'` to block actual form navigation. CSP restricts connections to the same origin and blocks object embedding; generated pages and response headers mark the demo `noindex`. These restrictions supplement the mock bridge; they do not provide desktop APIs.

The demo CSP permits `wasm-unsafe-eval` for the client's Shiki syntax highlighter when expanding tool details or rendering code. JavaScript `unsafe-eval` remains disallowed. Keep the HTML meta policy and `public/_headers` policy aligned.

Native ResizeObserver loop notifications without an exception are excluded from host status: Chromium may defer layout notifications during expansion animations while the App remains operational. Actual exceptions remain browser diagnostics and trigger the nonblocking operational status. Fatal React root errors use the explicit failure message instead.

The native quick-action manifest references 72 WebP files in `case-previews/` (1,376,578 bytes total). The builder copies exactly those files from the pinned client's public directory, validates their relative paths and fails for missing sources. Native gallery images retain lazy loading, so these assets are only requested when visiting case galleries; they do not load with the homepage or initial sample conversation. Detail dialogs retain the native thumbnail fallback. A recorded translation patch supplies the missing `scheduledTasksActions` label in Chinese and English.

The WeCom browser stub returns null after the desktop-only notice; a recorded caller patch treats it as cancellation without credentials or a rejected promise. The pinned caller already catches SDK errors, but cancellation avoids creating an exception for an expected refusal. `/client-demo/*` has `Cache-Control: no-transform` to request that the CDN avoid injecting analytics into the isolated client. Its strict same-origin CSP remains unchanged; CDN behavior must be checked after deployment.

## Build and preview

Ordinary website builds use the checked-in `public/client-demo/` output and do not require the sibling client checkout:

```sh
bun install
npm run build
npm run preview -- --port 5187
```

Open `http://127.0.0.1:5187/#workbench` or `http://127.0.0.1:5187/en/#workbench`.

Regenerating or checking the client demo requires the client checkout and its installed dependencies. No dependencies were added to the website for this integration:

```sh
npm run demo:build
npm run demo:check
npm run lint
npm run demo:test
npm run demo:verify
npm run demo:verify:boundaries
npm run demo:verify:entry
npm run demo:verify:models
npm run demo:verify:resilience
```

Before updating the client pin, fetch `origin/main` in the client repository and inspect its AGENTS.md, DESIGN.md, UI and preload changes. Create a clean detached worktree, install its locked dependencies with Bun, update `client-source.json`, then adapt mocks and run the checks above. For the current pin, from the client repository:

```sh
git fetch origin
git worktree add --detach ../zhiyuan-demo-client-20261023 7a648be8f3562757f14d944c6726ea16bedfe119
cd ../zhiyuan-demo-client-20261023
bun install --frozen-lockfile --ignore-scripts
```

Only renderer dependencies are needed; Electron native rebuilds are skipped. The pinned patches affect main-process agent packages, not the imported renderer. `npm run demo:dev` serves the client entry separately on port 5188. A client source update requires regeneration; `npm run build` alone does not refresh the bundled App.

`demo:verify` requires a running production preview (default port 5187) and the client's installed Playwright browser. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` for another existing Chromium. The check uses actual pointer input with normal animation at desktop DPR 1 and 2, then reduced motion. It opens reasoning and all tool details, checks the host overlay, and exercises runtime-error recovery. Browser-generated ErrorEvents are recorded independently of Playwright's `pageerror` event; screenshots and a JSON report are saved to a temporary evidence directory.

`demo:test` runs 12 co-located Vitest tests for the bridge boundary, nested IM configuration and local-model lifecycle. `demo:verify:boundaries` uses actual UI clicks in Chinese and English to retry WeChat startup/login, edit channel projects and allowlists, add multi-platform instances, cancel WeCom authorization, visit all settings, exercise available switches/model tabs, decline platform connection/update/log export and prevent external navigation. It calls all 157 declared unsupported methods through the mounted bridge, checks fixed account identity and denied network settings, and recreates sessions/projects/schedules/MCP servers after deleting every fixture. Set `DEMO_CLIENT_URL=http://127.0.0.1:5188/client-demo/` only for development-server diagnostics; final verification uses the production host and iframe.

`demo:verify:models` clicks native controls in Chinese and English: repeated unload/load cycles including the five-second poll, memory settings, model preferences, empty logs, deletion of the last model, marketplace reinstallation and starting the reinstalled model. It verifies logout, OS window controls and restricted local-settings entries are absent. `--reproduce-model` isolates the initial unload regression; it failed against the previous production bundle with `Cannot read properties of undefined (reading '0')` in `C:/Users/Administrator/AppData/Local/Temp/zhiyuan-demo-model-lifecycle-rUL0q3/`.

Both locales pass the final model lifecycle regression in `C:/Users/Administrator/AppData/Local/Temp/zhiyuan-demo-model-lifecycle-2NzNbN/` with zero console/page errors.

`demo:verify:resilience` holds the actual client entry past the 20-second timeout, verifies continued loading and recovery, dispatches operational error/rejection events without losing the App, checks the automation action label, opens all six native case categories and a detail dialog per category, decodes all 72 thumbnails in each locale, and verifies fatal-message retry. It fails on console errors, page exceptions, missing translations and HTTP errors. Both locales pass in `C:/Users/Administrator/AppData/Local/Temp/zhiyuan-demo-resilience-FNIaLA/` (2026-10-23), with no missing assets or translations.

Current production regression evidence for the boundary follow-up: `zhiyuan-demo-boundaries-0jmTQg/` (both locales, all declared blocked operations, no unexpected errors/requests/popups), `zhiyuan-demo-entry-Hj0UCJ/` (desktop, DPR 2, mobile, reduced motion), and `zhiyuan-demo-interactions-bTdRvH/` (native pointer interactions, nonblocking operational events, fatal retry, sidebar title/time/action layout in both locales and themes). All directories are under `C:/Users/Administrator/AppData/Local/Temp/`. The 12 unit tests, typecheck, lint and both production builds pass. Earlier evidence below is retained as history.

## Verification

Check first entry; scroll-triggered startup; every sidebar destination; model search/filter/install; task/chat submission; reasoning and tool expansion; expert/skill, todo, automation, coding, and settings controls; feature state retention; reset; and retry. Inspect Chinese and English, desktop DPR 1 and 2, 390px mobile, and reduced motion. Check the client console and page overflow separately from the outer site.

`demo:verify:entry` records home-page animation frames on entry and refresh, verifies viewport-triggered startup and removed outer tabs/start/fullscreen controls, captures the native particle/static boot followed by the skeleton, and rejects a second logo loader or empty-home flash. It also checks desktop single-line explanation, outer-page overflow, both independent Chat fixtures, a concise follow-up and reset. Chinese desktop, English DPR 2, 390px mobile and reduced-motion production checks pass with zero console/page errors in `C:/Users/Administrator/AppData/Local/Temp/zhiyuan-demo-entry-sSuUML/` (2026-10-23).

The latest-source native comparison is in `C:/Users/Administrator/AppData/Local/Temp/zhiyuan-latest-native-comparison/`: native client browser-preview and website captures at 1280×800, plus `styles.json`. The resting tool/reasoning styles and tool hover styles match, including font, spacing, colors, radius and transition; both report no page errors. The original client checkout was preserved.

`demo:verify` also checks both distinct Work sessions, a budget follow-up, both coding sessions and their reasoning/tools, sidebar routes and Skills. It asserts the served source revision and recorded renderer patches match the pin. Earlier evidence is `C:/Users/Administrator/AppData/Local/Temp/zhiyuan-demo-interactions-Py5xTb/` (2026-10-23), including desktop DPR 1/2, reduced motion and Chinese/English light/dark sidebar checks. Resource measurements and limits are in `reports/live-demo-resource-comparison.md`; the latest snapshot is 2026-10-23 20:22 (UTC+8), comparing the now-interactive production website with the boundary follow-up, including the optional lazy case-image payload.

The production boundary regression evidence is `C:/Users/Administrator/AppData/Local/Temp/zhiyuan-demo-boundaries-JXzO0j/` (2026-10-23). Both locales passed all settings and IM flows, 157 restricted API checks, and creation after deleting fixtures. Chinese recorded 346 bridge calls and English 345; both recorded zero console/page errors, external requests and popups. The seven bridge/IM unit tests, demo typecheck, lint, demo production build and website production build also passed. These checks cover declared capabilities and the listed UI paths; they do not suppress or claim immunity to arbitrary future renderer defects.

Earlier UI evidence is in `C:/Users/Administrator/AppData/Local/Temp/zhiyuan-client-demo-qa-20261023/`; it predates the current source update. Temporary evidence is not a substitute for regenerating and rechecking after future client changes.
