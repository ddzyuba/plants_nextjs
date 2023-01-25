export type HeaderMenuProps = {
  data: HeaderMenuData;
}

export type HeaderMenuData = {
  headerMenu: {
    data: {
      attributes: {
        HeaderDynamicMenu: MenuItem[];
      }
    }
  }
}

export type MenuItem = {
  text: string;
  url: string;
}