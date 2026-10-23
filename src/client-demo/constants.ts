export const DemoModelState = {
  Loaded: 'loaded',
  Unloaded: 'unloaded',
} as const;

export const DemoInstallPhase = {
  Downloading: 'downloading',
  Done: 'done',
  Cancelled: 'cancelled',
} as const;

export const DemoServiceState = { Running: 'running' } as const;
