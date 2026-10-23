import type { CoworkSession } from '@client/types/cowork';
import { CoworkSessionMode } from '@shared/cowork/constants';

// Conversation fixtures discuss the gallery's models and sales-report facts.
// They do not inherit Work tool calls or claim to read/write local files.
export function chatSamples(english: boolean) {
  return english
    ? [
        {
          title: 'Choose a local model',
          prompt:
            'I want to chat locally and occasionally write Python. How should I choose a model?',
          reply:
            'Start with Qwen3 8B for everyday conversation, rewriting, and summaries. Choose a coding model from the model library when code is the main task.\n\nCheck the model’s weight size against available memory and leave room for the context cache. A smaller quantized model is a useful starting point; compare it on the same short prompts before trying a larger one.',
          followup: 'What should I compare first?',
          followupReply:
            'Try three prompts: summarize a short paragraph, rewrite a weekly update, and explain a Python function. Compare accuracy, instruction following, and response speed. For code, also check whether the proposed solution actually fits the problem.',
          brief:
            'Start with Qwen3 8B. Compare summaries, writing, and Python explanations on the same prompts; then try a coding model if you need more code support.',
        },
        {
          title: 'Polish a weekly update',
          prompt:
            'Turn these notes into a short weekly update: excess inventory in North China, September promotions reduced margins, and new customer share declined.',
          reply:
            'This week’s review identified three follow-up items: North China inventory, the margin impact of September promotions, and a declining share of new customers. Next week, regional owners will confirm inventory actions, review promotion timing, and check the customer conversion funnel.',
          followup: 'Make the next steps easier to scan.',
          followupReply:
            'Next week\n\n- Inventory: regional owners confirm stock levels and follow-up actions.\n- Promotions: review September spend and its impact on margins.\n- Acquisition: check new customer conversion and identify where the funnel loses people.',
          brief:
            'Follow up on North China inventory, review promotion margins, and check new customer conversion. Confirm owners and dates for each item.',
        },
      ]
    : [
        {
          title: '选择本地模型',
          prompt: '我想在本机聊天，偶尔写一点 Python，应该怎么选模型？',
          reply:
            '可以先用 Qwen3 8B 处理日常问答、文字改写和摘要。编程需求较多时，再从模型库选择偏代码的模型。\n\n先对照可用内存检查模型权重大小，并为上下文缓存留出空间。可以从较小的量化版本开始，用相同的问题比较效果和速度，再决定是否尝试更大的模型。',
          followup: '先比较哪些能力比较合适？',
          followupReply:
            '可以准备三个小问题：总结一段文字、改写一份周报、解释一个 Python 函数。重点比较事实是否准确、是否遵循要求，以及响应速度。代码回答还要检查方案是否符合实际问题。',
          brief:
            '先试 Qwen3 8B，用同样的问题比较摘要、写作和 Python 解释。代码需求增加后，再尝试偏编程的模型。',
        },
        {
          title: '整理一段工作周报',
          prompt: '把这些要点整理成简短周报：华北库存积压，9 月促销影响毛利，新客占比下滑。',
          reply:
            '本周复盘发现三项需要跟进的问题：华北渠道库存积压、9 月集中促销影响毛利，以及新客占比下滑。下周将由区域负责人确认库存处理安排，复核促销节奏，并检查新客转化环节。',
          followup: '把下周计划改成清单。',
          followupReply:
            '下周计划\n\n- 库存：由区域负责人确认库存现状与后续处理安排。\n- 促销：复核 9 月投放费用及其对毛利的影响。\n- 获客：检查新客转化数据，定位流失环节。',
          brief: '下周跟进华北库存、复核促销毛利、检查新客转化，并逐项明确负责人和完成时间。',
        },
      ];
}

export function createChatSessions(template: CoworkSession, english: boolean, now: number) {
  return chatSamples(english).map((sample, index): CoworkSession => {
    const turns = [sample.prompt, sample.reply, sample.followup, sample.followupReply];
    return {
      ...structuredClone(template),
      id: `chat-session-${index}`,
      mode: CoworkSessionMode.Chat,
      title: sample.title,
      workspaceId: '',
      cwd: '',
      messages: turns.map((content, turn) => ({
        id: `chat-${index}-${turn}`,
        type: turn % 2 ? 'assistant' : 'user',
        content,
        timestamp: now - 120000 + turn * 10000,
      })),
      totalMessages: turns.length,
    };
  });
}

export function replyForChat(session: CoworkSession, english: boolean): string {
  const samples = chatSamples(english);
  const prompts = session.messages.filter(message => message.type === 'user');
  const latest = prompts.at(-1)?.content ?? '';
  const topic = /周报|清单|库存|促销|weekly|update|inventory|promotion|checklist/i;
  const sample = samples[topic.test(prompts.map(message => message.content).join('\n')) ? 1 : 0];
  if (/简短|简洁|精简|short|brief|concise/i.test(latest)) return sample.brief;
  return prompts.length > 1 ? sample.followupReply : sample.reply;
}
