export type StaffProps = {
  data: StaffData;
}

export type StaffData = {
  homePage: {
    data: {
      attributes: {
        dynamicZone: ComponentLayoutStaff[];
      }
    }
  }
}

export type ComponentLayoutStaff = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  text: string;
  button: {
    text: string;
    url: string;
  }
  employees: {
    data: Employee[];
  }
}

export type Employee = {
  attributes: {
    name: string;
    job: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    image: {
      data: {
        attributes: {
          name: string;
          url: string;
        }
      }
    }
  }
}