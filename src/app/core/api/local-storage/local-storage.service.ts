import { Injectable } from '@angular/core';
import { UserSettings } from 'app/core/models/UserSettings';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private userSettingsKey: string = "user_settings";

  constructor() { }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getCachedUserSettings(): UserSettings {
    return <UserSettings>(this.get(this.userSettingsKey));
  }

  cacheUserSettings(userSettings: UserSettings) {
    this.set(this.userSettingsKey, userSettings);
  }
}
