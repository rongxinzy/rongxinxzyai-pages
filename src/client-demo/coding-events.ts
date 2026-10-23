import { CodingEventKind, CodingToolCallStatus, type CodingEvent } from '@shared/codingAgent';
import { sessionSamples } from './sample-data';

export function codingTurnEvents(
  sample: (typeof sessionSamples)[number],
  laneId: string,
  sequence: number,
  prompt = sample.codePrompt,
): CodingEvent[] {
  const started = Date.now() - 60000;
  const payloads: Pick<CodingEvent, 'kind' | 'payload'>[] = [
    { kind: CodingEventKind.Message, payload: { role: 'user', content: prompt } },
    { kind: CodingEventKind.Reasoning, payload: { content: sample.codeReasoning } },
    {
      kind: CodingEventKind.ToolCall,
      payload: {
        toolCallId: crypto.randomUUID(),
        title: `Bash ${sample.tools[2]}`,
        kind: 'execute',
        status: CodingToolCallStatus.Completed,
        rawInput: { command: sample.tools[2] },
        rawOutput: sample.results[2],
      },
    },
    { kind: CodingEventKind.Message, payload: { role: 'assistant', content: sample.codeReply } },
    { kind: CodingEventKind.TurnComplete, payload: {} },
  ];
  return payloads.map((event, index) => ({
    ...event,
    id: crypto.randomUUID(),
    laneId,
    sequence: sequence + index,
    createdAt: started + index * 10000,
  }));
}
