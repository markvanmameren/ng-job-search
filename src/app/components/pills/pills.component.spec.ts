import { ComponentFixture, TestBed } from '@angular/core/testing';

import { setComponentInput } from '../../testing/utilities/set-component-input.util';
import { PillsComponent } from './pills.component';

describe('PillsComponent', () => {
  let component: PillsComponent;
  let fixture: ComponentFixture<PillsComponent>;

  let mockPills: string[];

  beforeEach(async () => {
    mockPills = ['pill 1', 'pill 2', 'pill 3'];

    await TestBed.configureTestingModule({
      imports: [PillsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PillsComponent);
    component = fixture.componentInstance;

    setComponentInput(fixture, 'pills', mockPills);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a ul', () => {
    const ul = fixture.nativeElement.querySelector('ul.pills');

    expect(ul).toBeInstanceOf(HTMLUListElement);
  });

  it('should render an li element for every pill', () => {
    const listElements: NodeListOf<HTMLLIElement> =
      fixture.nativeElement.querySelectorAll('li');

    expect(listElements.length).toBe(3);
    listElements.forEach((li) => {
      expect(li).toBeInstanceOf(HTMLLIElement);
    });
  });

  it('should render an p element for every pill', () => {
    const pills: NodeListOf<HTMLParagraphElement> =
      fixture.nativeElement.querySelectorAll('p.pill');

    expect(pills.length).toBe(3);
    pills.forEach((li, i) => {
      expect(li).toBeInstanceOf(HTMLParagraphElement);
      expect(li.innerHTML).toBe(mockPills[i]);
    });
  });
});
