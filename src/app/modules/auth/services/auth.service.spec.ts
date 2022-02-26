import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import * as mockRaw from '../../../data/user.json';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  let mockUser:any = (mockRaw as any).default;
  let httpClientSpy:{ post:jasmine.Spy }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post'])
    service = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //TODO prueba del send credentials

  it('Debe retornar un objeto con token session', (done:DoneFn)=>{
    //Arrange
    const  user:any = mockUser.userOk;
    const mockResponse ={
      data:{},
      tokenSession:'0x0x0x0x'
    }


    httpClientSpy.post.and.returnValue(
      of(mockResponse)//manera de decirle ya es un observable      
      );//Lo que responde la API

    //Act
    service.sendCredentials(user.email, user.password)
    .subscribe(resp=>{
      const getProperties = Object.keys(resp);
      expect(getProperties).toContain('data');
      expect(getProperties).toContain('tokenSession');
      console.log('api reponse, ',resp);
      done();
    })

  })

  it('suma de 2+3',()=>{
    const a = 2;
    const b = 3;
    const c = service.suma(a,b);
    expect(c).toEqual(5)
  })
});
