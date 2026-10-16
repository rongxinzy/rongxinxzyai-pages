export type RoadmapItem = {
  date: string;
  text: string;
  textEn?: string;
  url: string;
  done: boolean;
};

export type RoadmapMilestone = {
  id: string;
  title: string;
  titleEn?: string;
  items: RoadmapItem[];
};

export type RoadmapFile = {
  milestones: RoadmapMilestone[];
};
