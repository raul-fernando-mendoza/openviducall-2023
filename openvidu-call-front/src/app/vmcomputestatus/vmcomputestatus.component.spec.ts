import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmcomputestatusComponent } from './vmcomputestatus.component';

describe('VmcomputestatusComponent', () => {
  let component: VmcomputestatusComponent;
  let fixture: ComponentFixture<VmcomputestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmcomputestatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VmcomputestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
