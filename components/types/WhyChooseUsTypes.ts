export type WhyChooseUsProps = {
  data: WhyChooseUsData;
}

export type WhyChooseUsData = {
  homePage: {
    data: {
      attributes: {
        dynamicZone: ComponentLayoutWhyChooseUs[];
      }
    }
  }
}

export type ComponentLayoutWhyChooseUs = {
  __typename: string;
  heading: string;
  text: string;
  button: {
    text: string;
    url: string;
  }
  textList: TextItem[];
  image: {
    data: {
      attributes: {
        name: string;
        url: string;
      }
    }
  }
}

export type TextItem = {
  text: string;
}