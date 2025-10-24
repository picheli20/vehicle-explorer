import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ENVIRONMENT_TOKEN, Environment } from '@vehicle-explorer/page';
import { firstValueFrom, of } from 'rxjs';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpClient;
  const mockEnv: Environment = { apiUrl: 'http://fakeapi.com' } as any;

  beforeEach(() => {
    const httpMock = { get: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpClient, useValue: httpMock },
        { provide: ENVIRONMENT_TOKEN, useValue: mockEnv },
      ],
    });

    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpClient);
  });

  describe('getMakers()', () => {
    it('should call HttpClient.get with correct URL', async () => {
      const mockResponse = { Results: [] };
      (http.get as jest.Mock).mockReturnValue(of(mockResponse));

      const result = await firstValueFrom(service.getMakers());
      expect(result).toBe(mockResponse);
      expect(http.get).toHaveBeenCalledWith(`${mockEnv.apiUrl}/vehicles/getallmakes?format=json`);
    });

    it('should return cached value on second call', async () => {
      const cachedResponse = { Results: ['Tesla'] };
      (http.get as jest.Mock).mockReturnValue(of(cachedResponse));

      await firstValueFrom(service.getMakers()); // first call populates cache
      const result = await firstValueFrom(service.getMakers()); // second call
      expect(http.get).toHaveBeenCalledTimes(1); // only the first call triggers HTTP
      expect(result).toBe(cachedResponse);
    });
  });

  describe('getVehicleTypes()', () => {
    it('should call correct URL', async () => {
      (http.get as jest.Mock).mockReturnValue(of({ Results: [] }));
      await firstValueFrom(service.getVehicleTypes(123));
      expect(http.get).toHaveBeenCalledWith(`${mockEnv.apiUrl}/vehicles/GetVehicleTypesForMakeId/123?format=json`);
    });
  });

  describe('getModels()', () => {
    it('should call correct URL', async () => {
      (http.get as jest.Mock).mockReturnValue(of({ Results: [] }));
      await firstValueFrom(service.getModels(123));
      expect(http.get).toHaveBeenCalledWith(`${mockEnv.apiUrl}/vehicles/GetModelsForMakeId/123?format=json`);
    });
  });

  describe('getMakerDetail()', () => {
    it('should call correct URL', async () => {
      (http.get as jest.Mock).mockReturnValue(of({ Results: {} }));
      await firstValueFrom(service.getMakerDetail(123));
      expect(http.get).toHaveBeenCalledWith(`${mockEnv.apiUrl}/vehicles/GetManufacturerDetails/123?format=json`);
    });
  });

  describe('getDetails()', () => {
    it('should combine vehicleTypes, models, and detail, then cache result', async () => {
      const types = { Results: ['SUV'] };
      const models = { Results: ['Model X'] };
      const detail = { Results: {} };

      (http.get as jest.Mock)
        .mockReturnValueOnce(of(types))
        .mockReturnValueOnce(of(models))
        .mockReturnValueOnce(of(detail));

      const result = await firstValueFrom(service.getDetails(1));
      expect(result).toEqual({ makeId: 1, types: types.Results, models: models.Results });

      // call again should return cached value without new HTTP calls
      const cached = await firstValueFrom(service.getDetails(1));
      expect(cached).toEqual({ makeId: 1, types: types.Results, models: models.Results });
      expect(http.get).toHaveBeenCalledTimes(3); // only original calls
    });
  });
});
