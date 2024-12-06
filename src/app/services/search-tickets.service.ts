import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchTicketsService {
  private searchData: any = null;
  private searchResults: any = null;

  setSearchData(data: any) {
    this.searchData = data;
  }

  setSearchDataResults(data: any) {
    this.searchResults = data;
  }

  getSearchData() {
    return this.searchData;
  }

  getSearchDataResults() {
    return this.searchResults;
  }
}
