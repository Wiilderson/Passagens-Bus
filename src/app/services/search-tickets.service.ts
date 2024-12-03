import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchTicketsService {
  private searchData: any = null;

  setSearchData(data: any) {
    this.searchData = data;
  }

  getSearchData() {
    return this.searchData;
  }
}
