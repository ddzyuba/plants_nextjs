export type FooterMenuProps = {
  data: FooterMenuData;
}

export type FooterMenuData = {
  footerMenu: {
    data: {
      attributes: {
        copyright: string;
        copyrightLinks: MenuItem[];
        FooterMenuDynamicZone: DynamicZoneItem[]
      }
    }
  }
}

type DynamicZoneItem = {
  heading: string;
  text: string;
  links: MenuItem[];
}

export type MenuItem = {
  text: string;
  url: string;
}