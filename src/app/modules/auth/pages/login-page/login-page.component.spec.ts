import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ LoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //primer enunciado lo cual debe asegurar lo siguiente
  //Debe asegurarse que el formulario sea invalido cuando los datos sean erroneos

  //PATRON: AAA

  it('Deberia retornar "invalido" el formulario', () => {

    //TODO: Arrange
    const mockCredentials ={
      email:'zxczdfdsdf',
      password:'1234567asdasdasdasdasa8'
    }

    const emailForm : any = component.formLogin.get('email')
    const passwordForm : any = component.formLogin.get('password')
    //TODO: Act

    emailForm.setValue(mockCredentials.email);
    passwordForm.setValue(mockCredentials.password);

    //TODO: Assert



    expect(component.formLogin.invalid).toEqual(true);
  });

  it('Deberia retornar "valido" el formulario', () => {

    //TODO: Arrange
    const mockCredentials ={
      email:'test@test.com',
      password:'12345678'
    }

    const emailForm : any = component.formLogin.get('email')
    const passwordForm : any = component.formLogin.get('password')
    //TODO: Act

    emailForm.setValue(mockCredentials.email);
    passwordForm.setValue(mockCredentials.password);

    //TODO: Assert



    expect(component.formLogin.invalid).toEqual(false);
  });

  it('EL boton debe decir "Iniciar sesión"', () => {

    //TODO: Arrange
    const elementRef = fixture.debugElement.query(By.css('.form-action button'));
    const getInnerText = elementRef.nativeElement.innerText;

    //TODO: Act

    //TODO: Assert
    expect(getInnerText).toEqual('Iniciar sesión');
  });

});
