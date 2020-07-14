export interface App {
  id: string;
  name: string;
  owner: string;
}

export interface AddAppInput {
  name: string;
  owner: string;
}

export interface Privilege {
  id: string;
  app: App;
  name: string;
  order: string;
  short?: string;
  tags?: string[];
}

export interface AddPrivilegeInput {
  name: string;
  short?: string;
  tags?: string[];
}

export interface UpdatePrivilegeInput {
  name?: string;
  short?: string;
  tags?: string[];
}
