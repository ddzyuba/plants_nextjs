import { WorkingProcessData } from './WorkingProcessTypes';

export type ServiceProps = {
  data: {
    data: ServicePropsData[];
  };
  workingProcessData: WorkingProcessData;
}

export type ServicePropsData = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
}

export type StaticProps = {
  params: {
    slug: string;
  }
}