import type { CoworkSession, CoworkMessage } from '@client/types/cowork';
import { CoworkSessionStatusValue } from '@client/types/cowork';
import { CoworkSessionMode, CoworkSessionSource } from '@shared/cowork/constants';
import { ActivitySource, ActivityStatus } from '@shared/activity/constants';
import type { ActivityRun } from '@shared/activity/types';
import { AgentId } from '@shared/agent';
import { TodoSourceType, TodoStatus, type Todo } from '@shared/todo';
import { MarketplaceCapability, type MarketplaceModel } from '@shared/marketplace';
import type { Skill } from '@client/types/skill';
import type { Agent } from '@client/types/agent';
import { demoCopy } from '../editorial/copy';
import gallery from './gallery.json';
import { createChatSessions } from './chat-samples';

export const english = new URLSearchParams(location.search).get('locale') === 'en';
export const words = demoCopy(english ? 'en' : 'zh-CN');
export const phrase = (zh: string, en: string) => (english ? en : zh);
export const now = Date.now();
export const workspace = {
  id: 'q3',
  name: phrase('季度经营分析', 'Quarterly analysis'),
  path: '/workspace/q3-sales',
  isHidden: false,
  createdAt: now,
  updatedAt: now,
};
export const sessionSamples = [
  {
    title: phrase('撰写第三季度销售分析报告', 'Write the Q3 sales analysis'),
    draft: words.draft,
    reasoning: words.reasoning,
    tools: words.tools,
    results: [
      phrase(
        '季度营收：4,826 万元；同比增长 9.8%。毛利率：31.2%；环比下降 1.4 个百分点。',
        'Quarterly revenue: CNY 48.26 million, up 9.8% YoY. Gross margin: 31.2%, down 1.4 points QoQ.',
      ),
      phrase(
        '周报摘要：华北库存积压；9 月集中促销影响毛利；新客占比下滑。',
        'Weekly report summary: excess inventory in North China; September promotions reduced margins; new customer share declined.',
      ),
      phrase(
        '区域分析完成。已汇总营收、毛利率、同比变化与主要经营问题。',
        'Regional analysis complete. Revenue, margins, year-over-year changes, and operating issues have been summarized.',
      ),
      phrase(
        '已保存销售分析报告：output/Q3-sales-report.docx',
        'Saved the sales analysis: output/Q3-sales-report.docx',
      ),
    ],
    report: words.report,
    codeTitle: 'analyze_q3.py',
    codeReasoning: phrase(
      '用 pandas 读取销售表，按区域汇总本期与去年同期营收，计算同比变化并导出 CSV，供季度报告引用。',
      'Read sales with pandas, aggregate current and prior-year revenue by region, calculate growth, and export a CSV for the quarterly report.',
    ),
    codePrompt: phrase(
      '编写 analyze_q3.py，按区域汇总 sales_q3.xlsx 的营收并对比去年同期，生成季度分析数据。',
      'Write analyze_q3.py to summarize sales_q3.xlsx revenue by region and compare it with last year.',
    ),
    codeReply:
      phrase(
        '已编写 analyze_q3.py，使用 pandas 汇总区域营收并计算同比变化。',
        'Created analyze_q3.py to aggregate regional revenue and calculate year-over-year changes.',
      ) +
      '\n\n```python\nimport pandas as pd\n\nsales = pd.read_excel("data/sales_q3.xlsx")\nsummary = sales.groupby("region")[["revenue", "revenue_2025Q3"]].sum()\nsummary["growth"] = summary["revenue"] / summary["revenue_2025Q3"] - 1\nsummary.to_csv("output/q3-by-region.csv")\n```\n\n' +
      phrase(
        '运行结果：已生成 output/q3-by-region.csv，可用于撰写季度销售报告。',
        'Run result: output/q3-by-region.csv is ready for the quarterly sales report.',
      ),
  },
  {
    title: phrase('核对各区域预算执行表', 'Review regional budgets'),
    draft: phrase(
      '核对各区域第三季度预算执行表，结合周报检查费用归属与异常支出，整理需要跟进的事项并输出核对清单。',
      'Review regional Q3 budget execution against weekly reports, check expense allocation and unusual spending, and produce a follow-up checklist.',
    ),
    reasoning: phrase(
      '先按区域对齐预算与实际费用，再核对促销、库存和获客费用的归属，区分已确认事项与需要业务负责人补充凭证的事项。',
      'Align budgets and actual expenses by region, reconcile promotion, inventory, and acquisition costs, and separate confirmed items from those requiring supporting records.',
    ),
    tools: [
      'data/regional_budget_q3.xlsx',
      'weekly-reports/',
      'python reconcile_budget.py --quarter 2026Q3 --by region',
      'output/Q3-budget-checklist.xlsx',
    ],
    results: [
      phrase(
        '已读取区域预算表，包含区域、预算科目、预算金额、实际费用和费用说明。',
        'Loaded regional budgets with region, expense category, budget, actual spend, and expense notes.',
      ),
      phrase(
        '交叉核对项：华北库存跟进费用、9 月促销投放及新客获客支出。',
        'Cross-check items: North China inventory expenses, September promotions, and new customer acquisition costs.',
      ),
      phrase(
        '核对完成：已按区域汇总差异，将缺少费用说明和待补充凭证的条目列入跟进清单。',
        'Reconciliation complete. Regional differences are summarized; missing expense notes and supporting records are flagged for follow-up.',
      ),
      phrase(
        '已保存预算核对清单：output/Q3-budget-checklist.xlsx',
        'Saved the budget checklist: output/Q3-budget-checklist.xlsx',
      ),
    ],
    report: phrase(
      '第三季度区域预算核对清单\n\n核对范围：区域预算、实际费用与周报中的业务事项。\n\n需要跟进\n1. 华北区域：核对库存相关费用的归属与后续安排。\n2. 促销费用：补充 9 月集中促销的审批与费用说明，结合毛利变化复核投放节奏。\n3. 获客支出：结合新客占比下滑，复核费用归属与转化跟踪。\n\n交付文件：output/Q3-budget-checklist.xlsx\n对缺少凭证的条目保留待核对状态，交由区域负责人补充确认。',
      'Q3 Regional Budget Checklist\n\nScope: regional budgets, actual expenses, and business activities recorded in weekly reports.\n\nFollow-up items\n1. North China: confirm inventory expense allocation and next steps.\n2. Promotions: obtain September approvals and expense notes; review timing against margin changes.\n3. Acquisition: review cost allocation and conversion tracking as new customer share declines.\n\nDeliverable: output/Q3-budget-checklist.xlsx\nItems lacking supporting records remain pending confirmation by regional owners.',
    ),
    codeTitle: 'reconcile_budget.py',
    codeReasoning: phrase(
      '按区域和费用科目汇总预算与实际费用，计算差异，并把核对结果写入 Excel 清单。',
      'Aggregate budgets and actual expenses by region and category, calculate variances, and write the reconciliation to an Excel checklist.',
    ),
    codePrompt: phrase(
      '编写 reconcile_budget.py，按区域对齐预算和实际费用，计算差异并导出预算核对清单。',
      'Write reconcile_budget.py to reconcile budget and actual expenses by region and export a checklist.',
    ),
    codeReply:
      phrase(
        '已编写 reconcile_budget.py，按区域和费用科目核对预算执行。',
        'Created reconcile_budget.py to reconcile budgets by region and expense category.',
      ) +
      '\n\n```python\nimport pandas as pd\n\nbudget = pd.read_excel("data/regional_budget_q3.xlsx")\nchecklist = budget.groupby(["region", "category"])[["budget", "actual"]].sum()\nchecklist["variance"] = checklist["actual"] - checklist["budget"]\nchecklist.to_excel("output/Q3-budget-checklist.xlsx")\n```\n\n' +
      phrase(
        '运行结果：已生成 output/Q3-budget-checklist.xlsx，包含区域、费用科目、预算、实际费用与差异。',
        'Run result: output/Q3-budget-checklist.xlsx includes region, category, budget, actual expenses, and variance.',
      ),
  },
];
function createMessages(
  sample: (typeof sessionSamples)[number],
  sessionIndex: number,
): CoworkMessage[] {
  const prefix = `q3-${sessionIndex}`;
  return [
    { id: `${prefix}-prompt`, type: 'user', content: sample.draft, timestamp: now - 60000 },
    {
      id: `${prefix}-thinking`,
      type: 'assistant',
      content: sample.reasoning,
      timestamp: now - 59000,
      metadata: { isThinking: true, thinkingDurationMs: 7000 },
    },
    ...sample.tools.flatMap((file, index): CoworkMessage[] => [
      {
        id: `${prefix}-tool-${index}`,
        type: 'tool_use',
        content: '',
        timestamp: now - 50000 + index * 1000,
        metadata: {
          toolUseId: `${prefix}-call-${index}`,
          toolName: ['Read', 'Read', 'Bash', 'Write'][index],
          toolInput:
            index === 2
              ? { command: file }
              : index === 3
                ? { path: file, content: sample.report }
                : { path: file },
        },
      },
      {
        id: `${prefix}-result-${index}`,
        type: 'tool_result',
        content: sample.results[index],
        timestamp: now - 49500 + index * 1000,
        metadata: {
          toolUseId: `${prefix}-call-${index}`,
          toolName: ['Read', 'Read', 'Bash', 'Write'][index],
          toolResult: sample.results[index],
        },
      },
    ]),
    {
      id: `${prefix}-answer`,
      type: 'assistant',
      content: sample.report,
      timestamp: now - 40000,
      metadata: { isFinal: true, isFinalAnswer: true },
    },
  ];
}
export const messages = createMessages(sessionSamples[0], 0);
export const sessions: CoworkSession[] = sessionSamples.map((sample, index) => ({
  id: `q3-session-${index}`,
  title: sample.title,
  claudeSessionId: null,
  status: CoworkSessionStatusValue.Completed,
  mode: CoworkSessionMode.Work,
  pinned: false,
  cwd: workspace.path,
  systemPrompt: '',
  modelOverride: '',
  executionMode: 'local',
  activeSkillIds: [],
  workspaceId: workspace.id,
  agentId: AgentId.Main,
  source: CoworkSessionSource.Manual,
  messages: createMessages(sample, index),
  messagesOffset: 0,
  totalMessages: messages.length,
  artifacts: [],
  createdAt: now - 60000,
  updatedAt: now - 40000,
}));
sessions.push(...createChatSessions(sessions[0], english, now));
export const skills: Skill[] = gallery[english ? 'en' : 'zh'].skills.map((sample, index) => ({
  id: `skill-${index}`,
  name: sample.name,
  description: sample.description,
  enabled: true,
  pinned: index < 4,
  isOfficial: true,
  isBuiltIn: index < 4,
  updatedAt: now,
  prompt: `${sample.description}\n\n${words.draft}`,
  skillPath: `/skills/${index}/SKILL.md`,
}));
export const models: MarketplaceModel[] = gallery[english ? 'en' : 'zh'].models.map(
  (sample, index) => {
    const capability = /Embedding/i.test(sample.name)
      ? MarketplaceCapability.Embedding
      : /VL|gemma-3/i.test(sample.name)
        ? MarketplaceCapability.Vision
        : /Coder/i.test(sample.name)
          ? MarketplaceCapability.Code
          : /R1/i.test(sample.name)
            ? MarketplaceCapability.Reasoning
            : MarketplaceCapability.Chat;
    const size = sample.variant.match(/([\d.]+)\s*(GB|MB)/i);
    const sizeBytes = size
      ? Math.round(Number(size[1]) * (size[2] === 'GB' ? 1024 ** 3 : 1024 ** 2))
      : 4_900_000_000;
    const filePath = sample.file ?? `${sample.name}-Q4_K_M.gguf`;
    return {
      source: 'modelscope-gguf',
      id: `model-${index}`,
      repoId: `${sample.publisher}/${sample.name}`,
      name: sample.name,
      description: sample.description,
      tags: ['Q4_K_M'],
      sizes: ['Q4_K_M'],
      recommendedTag: 'Q4_K_M',
      capability,
      capabilities: [capability],
      filePath,
      installed: false,
      isFeatured: true,
      parameterCount: Number(sample.name.match(/([\d.]+)B/i)?.[1] ?? 8) * 1_000_000_000,
      downloads: 28460 - index * 1050,
      files: [
        {
          path: filePath,
          sizeBytes,
          quantization: 'Q4_K_M',
          isRecommended: true,
        },
      ],
    };
  },
);
export const agents: Agent[] = [
  {
    id: AgentId.Main,
    name: '知远',
    description: phrase('分析、执行与交付', 'Analyze, execute, and deliver'),
    systemPrompt: '',
    identity: '',
    model: '',
    workingDirectory: workspace.path,
    icon: 'bot',
    skillIds: [],
    enabled: true,
    pinned: true,
    isDefault: true,
    source: 'custom',
    presetId: '',
    createdAt: now,
    updatedAt: now,
  },
];
export const activityRuns: ActivityRun[] = [
  {
    id: 'q3-run',
    source: ActivitySource.ScheduledTask,
    status: ActivityStatus.Completed,
    startedAt: now - 3600000,
    updatedAt: now - 3540000,
    taskName: phrase('每周销售简报', 'Weekly sales brief'),
    inputPreview: words.draft,
    replyPreview: words.report,
    sessionId: sessions[0].id,
  },
  {
    id: 'q3-channel',
    source: ActivitySource.Channel,
    status: ActivityStatus.Completed,
    startedAt: now - 7200000,
    updatedAt: now - 7140000,
    platform: 'feishu',
    taskName: phrase('区域预算核对', 'Regional budget review'),
    inputPreview: sessionSamples[1].draft,
    replyPreview: sessionSamples[1].report,
    sessionId: sessions[1].id,
  },
];
export const todos: Todo[] = [
  phrase('跟进华北渠道库存', 'Follow up on North China inventory'),
  phrase('调整九月促销方案', 'Review September promotions'),
  phrase('检查新客转化数据', 'Review new customer conversions'),
].map((title, index) => ({
  id: `todo-${index}`,
  title,
  note: words.reasoning,
  status: TodoStatus.Active,
  important: index === 0,
  dueAt: now + 86400000,
  remindAt: null,
  listId: null,
  listName: null,
  myDayDate: new Date().toLocaleDateString('en-CA'),
  createdAt: now,
  updatedAt: now,
  completedAt: null,
  sourceType: TodoSourceType.Manual,
  sourceId: null,
  steps: [],
}));
