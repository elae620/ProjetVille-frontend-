import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVille } from './add-ville';

describe('AddVille', () => {
  let component: AddVille;
  let fixture: ComponentFixture<AddVille>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVille]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVille);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
