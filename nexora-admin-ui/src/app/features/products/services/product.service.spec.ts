import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the new endpoint to fetch product', () => {
    const mockResponse = [
      {
        id: 1,
        sku: 'NXR-001',
        name: 'Widget Pro',
        price: 99.99,
        stock: 50,
        status: 'ACTIVE',
      },
    ];

    service.getProducts().subscribe((response) => {
      expect(response.length).toBe(1);
    });

    const req = httpMock.expectOne(environment.apiProducts);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call inventory endpoint to update stock', () => {
    const productId = 10;
    const quantity = 3;

    let completed = false;

    service.updateStock(productId, quantity).subscribe((response) => {
      completed = true;
    });

    const req = httpMock.expectOne(`${environment.apiInventory}/stock-update`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ productId, quantity });
    req.flush(null);

    expect(completed).toBeTrue();
  });

  it('should call products endpoint to deactivate a product', () => {
    const id = 7;
    const mockResponse = {
      id,
      sku: 'NXR-007',
      name: 'Widget Basic',
      description: 'Basic widget',
      price: 19.99,
      stock: 0,
      category: 'widgets',
      status: 'INACTIVE',
    };

    service.deactivateProduct(id).subscribe((response) => {
      expect(response.status).toBe('INACTIVE');
    });

    const req = httpMock.expectOne(`${environment.apiProducts}/${id}/status`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status: 'INACTIVE' });
    req.flush(mockResponse);
  });
});
