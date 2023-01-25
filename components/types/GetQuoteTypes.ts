export type GetQuoteProps = {
  data: GetQuoteData;
}

export type GetQuoteData = {
  homePage: {
    data: {
      attributes: {
        dynamicZone: ComponentLayoutGetQuote[];
      }
    }
  }
}

export type ComponentLayoutGetQuote = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  button: {
    text: string;
    url: string;
  }
}