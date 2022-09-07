import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDocEditingComponent } from './multi-doc-editing.component';

describe('MultiDocEditingComponent', () => {
  let component: MultiDocEditingComponent;
  let fixture: ComponentFixture<MultiDocEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiDocEditingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDocEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
