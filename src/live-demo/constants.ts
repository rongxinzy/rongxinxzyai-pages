export const DemoScene = {
  Conversation: 'conversation',
  Models: 'model-market',
  Skills: 'skills',
  Workspace: 'workspace',
} as const;
export type DemoScene = (typeof DemoScene)[keyof typeof DemoScene];
export const DEMO_SCENES = Object.values(DemoScene);

export const DemoMessage = {
  Booting: 'zhiyuan-demo:booting',
  Ready: 'zhiyuan-demo:ready',
  Navigate: 'zhiyuan-demo:navigate',
  Changed: 'zhiyuan-demo:changed',
  Reset: 'zhiyuan-demo:reset',
  Error: 'zhiyuan-demo:error',
  Warning: 'zhiyuan-demo:warning',
} as const;

export function isDemoScene(value: unknown): value is DemoScene {
  return DEMO_SCENES.some(scene => scene === value);
}

export function readDemoMessage(value: unknown): { type: string; scene?: DemoScene } | null {
  if (!value || typeof value !== 'object' || !('type' in value) || typeof value.type !== 'string')
    return null;
  const scene = 'scene' in value && isDemoScene(value.scene) ? value.scene : undefined;
  return { type: value.type, scene };
}
