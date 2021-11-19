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

  private isLoaded(): boolean {
    return this.config !== undefined;
  }

  public get(key: string): string {
    if (!this.isLoaded()) {
      throw Error('Config file not loaded!');
    }
    if (!(key in this.config)) {
      throw Error(`Config file missing key: ${key}`);
    }
    return this.config[key];
  }
}
