import { Component, input } from '@angular/core';

@Component({
  selector: 'app-pills',
  standalone: true,
  imports: [],
  templateUrl: './pills.component.html',
  styleUrl: './pills.component.css',
})
export class PillsComponent {
  pills = input.required<string[]>();
}
