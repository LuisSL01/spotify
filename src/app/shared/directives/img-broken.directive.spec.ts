import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImgBrokenDirective } from './img-broken.directive';


//TODO: se necesita un componente de prueba
@Component({
  template:'<img class="testing-directive"  appImgBroken [src] = "srcMock">'
})
class TestComponent{
  public srcMock:any = null;
}

describe('ImgBrokenDirective', () => {
  let component:TestComponent;
  let fixture:ComponentFixture<TestComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations:[
        TestComponent,
        ImgBrokenDirective
      ]
    })

    fixture = TestBed.createComponent(TestComponent)
    component =  fixture.componentInstance
    fixture.detectChanges()
  })


  it('should create an instance', () => {    
    const mockElement = new ElementRef('')
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
  });

  it('TestComponent deberia instanciarse correctamente',()=>{
    expect(component).toBeTruthy();
  })

  it('Directiva deberia cambiar a imagen estatica',(done:DoneFn)=>{
    //Arrange
    const beforeImageElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement;
    const beforeImgSrc = beforeImageElement.src;//aqui ya tenemos la url antes de ser cambiada por la directiva
    component.srcMock = undefined;

    setTimeout(() => {
      const afterImageElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement;
      const afterImgSrc = beforeImageElement.src;//aqui ya tenemos la url antes de ser cambiada por la directiva

      expect(afterImgSrc).toEqual('http://localhost:9876/assets/images/image-broker.png');
      done();
    }, 3000);


  })


});
