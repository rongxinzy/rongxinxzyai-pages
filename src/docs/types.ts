export type DocsHeading = {
  id: string;
  text: string;
  depth: number;
};

export type DocsPage = {
  title: string;
  description: string;
  html: string;
  headings: DocsHeading[];
};
