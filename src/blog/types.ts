export type BlogHeading = {
  id: string;
  text: string;
  depth: number;
};

export type BlogPost = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  html: string;
  headings: BlogHeading[];
};
