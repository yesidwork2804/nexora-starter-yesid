import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  let service: CustomersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CustomersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get customers', () => {
    const mockCustomers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        active: true,
        createdAt: new Date()
      }
    ];

    service.getCustomers().subscribe(customers => {
      expect(customers.length).toBe(1);
      expect(customers[0].name).toBe('John Doe');
    });

    const req = httpMock.expectOne('api/customers');
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
  });

  it('should create customer', () => {
    const newCustomer = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '098-765-4321',
      address: '456 Oak Ave',
      active: true
    };

    service.createCustomer(newCustomer).subscribe(customer => {
      expect(customer.name).toBe('Jane Doe');
    });

    const req = httpMock.expectOne('api/customers');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCustomer);
    req.flush({ id: 2, ...newCustomer, createdAt: new Date() });
  });
});
