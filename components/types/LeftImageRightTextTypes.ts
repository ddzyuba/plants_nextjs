export type LeftImageRightTextDataProps = {
  data: LeftImageRightTextData;
}

export type LeftImageRightTextData = {
  homePage: {
    data: {
      attributes: {
        dynamicZone: ComponentLayoutLeftImageRightText[];
      }
    }
  }
}

export type ComponentLayoutLeftImageRightText = {
  __typename: string;
  titleGreen: string;
  titleBlack: string;
  text: string;
  image: {
    data: {
      attributes: UploadFile;
    }
  }
  smallDetails: SmallDetail[];
  button: {
    text: string;
    url: string;
  }
}

export type SmallDetail = {
  text: string;
  image: {
    data: {
      attributes: UploadFile;
    }
  }
}

export type UploadFile = {
  name: string;
  url: string;
}