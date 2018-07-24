import { TestBed, inject } from '@angular/core/testing';
import {Champ} from '../models/Champ.model';
import { FicheService } from './fiche.service';

describe('FicheService', () => {

  let service: FicheService;
  let httpClientSpy: { get: jasmine.Spy };


  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({ providers: [FicheService] });
  });

  // it('should return techid 1', () => {
  //   const service = FicheService;
  //   expect(this.model.get('techid')).toEqual(1);
  // });

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedChamp: Champ = {techid: 1, nom: 'Proust', prenom: 'Marcel', age: 40};
    service = TestBed.get(FicheService);

    httpClientSpy.get.and.returnValue(asyncData(expectedChamp));

    service.getChamp(expectedChamp.techid).subscribe(
      champ => expect(champ).toEqual(expectedChamp), fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

});
