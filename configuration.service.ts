import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private config: any;

  constructor(private http: HttpClient) { }

  async load() {
    const data = await this.http.get('/assets/config.json')
      .toPromise();
    this.config = data;
  }

  private isLoaded() {
    return this.config !== undefined;
  }
  
  public getApiAuthUrl() {
    if (!this.isLoaded()) {
      throw Error('Config file not loaded!');
    }
    return this.config.apiAuthUrl;
  }

  public getApiReportUrl() {
    if (!this.isLoaded()) {
      throw Error('Config file not loaded!');
    }
    return this.config.apiReportUrl;
  }
}
