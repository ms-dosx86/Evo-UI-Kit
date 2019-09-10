import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Tab {
    tabsGroupId: string;
    tabId: string;
}

@Injectable()
export class TabsService {

    tabsState$ = new Subject<Tab>();
    private tabsGroupsMap: Map<string, string[]> = new Map();

    registerTabsGroup(tabsGroupId) {
        this.tabsGroupsMap.set(tabsGroupId, []);
    }

    registerTab(tabsGroupId: string, tabId: string) {
        const tabsGroup = this.getRegisteredTabsGroup(tabsGroupId);

        if (!tabsGroup.some((name) => name === tabId)) {
            tabsGroup.push(tabId);
            if (tabsGroup.length === 1) {
                this.setDefaultTab(tabsGroupId, tabId);
            }
        }
    }

    getEventsSubscription(tabsGroupId?: string): Observable<Tab> {
        if (tabsGroupId) {
            return this.tabsState$.pipe(
                filter((data: Tab) => tabsGroupId === data.tabsGroupId),
            );
        }

        return this.tabsState$;
    }

    setTab(tabsGroupId: string, tabId: string) {
        this.tabsState$.next({tabsGroupId: tabsGroupId, tabId: tabId});
    }

    setDefaultTab(tabsGroupId: string, tabId?: string) {
        if (!this.tabsGroupsMap.has(tabsGroupId)) {
            return;
        }

        const defaultTabId = tabId || this.getRegisteredTabsGroup(tabsGroupId)[0];
        this.setTab(tabsGroupId, defaultTabId);
    }

    getRegisteredTabsGroup(tabsGroupId): string[] {
        return this.tabsGroupsMap.get(tabsGroupId);
    }
}
