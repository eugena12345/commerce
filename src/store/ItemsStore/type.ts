// types.ts - файл с типами для GitHubStore
export type GetOrganizationItem = {
    organizationName: string;
    perPage?: number;
    page?: number;
  };
  
  export interface IProductStore {
    getItemInfo(
      params: GetOrganizationItem
    ): Promise<void>;
  }