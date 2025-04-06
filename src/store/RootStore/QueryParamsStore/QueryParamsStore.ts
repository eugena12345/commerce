import { action, makeObservable, observable } from 'mobx';
import qs from 'qs';

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';
  page: string = '1';
  //TODO sort: string = "createdAt:desc";
  filters: Record<string, any> = {};

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
      page: observable,
      filters: observable,
      setPage: action,
      setFilters: action,
      updateUrl: action,
    });
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }


  private updateParams() {
    this._params = {
      page: this.page,
      filters: this.filters,
    };
  }

  setPage(page: number) {
    this.page = page.toString();
    this.updateParams();
  }

  // TODO setSort(sort: string) {
  //  this.sort = sort;
  // }

  setFilters(filters: Record<string, any>) {
    this.filters = filters;
    this.updateParams();
  }

  getQueryParams = () => {
    return {
      page: this.page,
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