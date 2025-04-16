import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPageComponent } from './listar-page.component';

describe('ListarPageComponent', () => {
  let component: ListarPageComponent;
  let fixture: ComponentFixture<ListarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
