export interface Google {
  accounts: {
    id: {
      initialize: (config: { client_id: string, auto_select: boolean, callback: (response: { credential: string, select_by: string }) => void }) => void,
      renderButton: (element: HTMLElement, config: { type: string, shape: string, theme: string, size: string, width: number }) => void,
      prompt: () => void
    }
  }
}

export interface GeneralResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Auth {
  sites: Site[];
  user: User;
  version: string
  token: string;
  loginType: string;
}

export interface Menu {
  idMenu: number;
  name: string;
  description: string;
  link: string;
  orden: string;
  active: string;
  idFatherMenu: string | null;
}

export interface Profile {
  idProfile: number;
  name: string;
  description: string;
  active: boolean;
}

export interface Site {
  idSite: number;
  name: string;
  codeSite: string;
  alias: string;
  active: boolean;
}

export interface User {
  idUser: number;
  idSite: number;
  userName: string;
  name: string;
  lastName: string;
  employeeNumber: string;
  mail: string;
  active: boolean;
  googleImage: string;
  site: Site
}