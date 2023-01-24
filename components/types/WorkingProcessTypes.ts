export type WorkingProcessProps = {
  data: WorkingProcessData;
}

export type WorkingProcessData = {
  homePage: {
    data: {
      attributes: {
        dynamicZone: ComponentLayoutWorkingProcess[];
      }
    }
  }
}

export type ComponentLayoutWorkingProcess = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  text: string;
  process: Process[];
}

export type Process = {
  title: string;
  text: string;
  icon1: {
    data: {
      attributes: {
        name: string;
        url: string;
      }
    }
  }
  icon2: {
    data: {
      attributes: {
        name: string;
        url: string;
      }
    }
  }
}