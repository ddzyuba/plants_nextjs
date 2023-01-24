export type FaqProps = {
  data: FaqData;
}

export type FaqData = {
  homePage: {
    data: {
      attributes: {
        dynamicZone: ComponentLayoutFaq[];
      }
    }
  }
}

export type ComponentLayoutFaq = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  text: string;
  image: {
    data: {
      attributes: {
        name: string;
        url: string;
      }
    }
  }
  faqItems: FaqItem[];
}

export type FaqItem = {
  question: string;
  answer: string;
}

export type FaqListItemProps = {
  el: FaqItem;
  i: number;
}