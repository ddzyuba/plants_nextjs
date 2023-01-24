export type ServiceListProps = {
  data: ServiceListData;
}

export type ServiceListData = {
  homePage: {
    data: {
      attributes: {
        dynamicZone: ComponentLayoutServices[];
      }
    }
  }
}

export type ComponentLayoutServices = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  text: string;
  services: { data: ComponentLayoutServicesData[] }
}

export type ComponentLayoutServicesData = {
  attributes: ComponentLayoutServicesAttributes;
}

export type ComponentLayoutServicesAttributes = {
  excerpt: string;
  slug: string;
  title: string;
  icon1: {
    data: {
      attributes: UploadFile
    }
  }
  icon2: {
    data: {
      attributes: UploadFile
    }
  }
}

export type UploadFile = {
  name: string;
  url: string;
}