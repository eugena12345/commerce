import { makeAutoObservable } from "mobx";
import qs from "qs";

export default class QueryStore {
  page: number = 1;
  //TODO sort: string = "createdAt:desc";
  filters: Record<string, any> = {};

  constructor() {
    makeAutoObservable(this, {
      //разобраться нужно или нет
      // page: observable,
      // sort: observable,
      // filters: observable,

      // setPage: action,
      // setSort: action,
      // setFilters: action,
      // updateUrl: action

    }

    );
  }

  setPage(page: number) {
    this.page = page;
  }

  // TODO setSort(sort: string) {
  //  this.sort = sort;
  // }

  setFilters(filters: Record<string, any>) {
    this.filters = filters;
  }

  getQueryParams = () => {
    return {
      page: this.page,
      // TODO sort: this.sort,
      filters: this.filters,
    }

  }

  updateUrl(setSearchParams: Function) {
    const queryParams = {
      page: this.page,
      // TODO sort: this.sort,
      filters: this.filters,
    };

    const queryString = qs.stringify(queryParams, { encode: false });

    setSearchParams(queryString, { replace: true });
    //ToDO сделать запрос на сервер
  }
}