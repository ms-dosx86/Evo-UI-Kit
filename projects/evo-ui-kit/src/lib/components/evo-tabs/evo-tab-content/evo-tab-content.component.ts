import { Component, Input, OnInit } from '@angular/core';
import { Tab, TabsService } from '../evo-tabs.service';

@Component({
    selector: 'evo-tab-content, [evoTabContent]',
    templateUrl: './evo-tab-content.component.html',
    styleUrls: ['./evo-tab-content.component.css'],
})
export class EvoTabContentComponent implements OnInit {

    @Input()
    set tabsRef(tabsRef: string) {
        const tabsRefArray = tabsRef.split('.');
        this._tabsGroupId = tabsRefArray[0];
        this._tabId = tabsRefArray[1];
    }
    _tabsGroupId: string;
    _tabId: string;

    isActive = false;

    constructor(
        private tabsService: TabsService,
    ) {

    }

    ngOnInit() {
        this.tabsService.getEventsSubscription(this._tabsGroupId).subscribe((data: Tab) => {
            this.isActive = this._tabId === data.tabId;
        });
    }
}
