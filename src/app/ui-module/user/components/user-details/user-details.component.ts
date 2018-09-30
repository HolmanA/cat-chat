import { Component, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Inject } from '@angular/core';

@Component({
    selector: 'user-details-component',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent {
    @Input() user: any;
}
