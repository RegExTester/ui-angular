import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RegexComponent } from './regex.component';
import { provideRouter } from '@angular/router';

describe('RegexComponent', () => {
  let component: RegexComponent;
  let fixture: ComponentFixture<RegexComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
