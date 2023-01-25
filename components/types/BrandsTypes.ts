export type BrandsProps = {
  data: BrandsData;
}

export type BrandsData = {
  homePage: {
    data: {
      attributes: {
        dynamicZone: ComponentLayoutBrands[];
      }
    }
  }
}

export type ComponentLayoutBrands = {
  __typename: string;
  brands: {
    data: UploadImage[];
  }
}

export type UploadImage = {
  attributes: {
    name: string;
    url: string;
  }
}