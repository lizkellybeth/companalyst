import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApiTokenComponent } from './get-api-token.component';

describe('GetApiTokenComponent', () => {
  let component: GetApiTokenComponent;
  let fixture: ComponentFixture<GetApiTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetApiTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetApiTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
