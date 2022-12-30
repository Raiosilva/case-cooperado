import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-load',
  templateUrl: './search-load.component.html',
  styleUrls: ['./search-load.component.scss']
})
export class SearchLoadComponent {
  @Input() searchText = '';
}
