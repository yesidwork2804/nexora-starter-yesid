import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get orders', () => {
    const mockOrders = [
      {
        id: 1,
        customerId: 1,
        orderNumber: 'ORD-001',
        total: 199.99,
        status: 'pending' as const,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    service.getOrders().subscribe(orders => {
      expect(orders.length).toBe(1);
      expect(orders[0].orderNumber).toBe('ORD-001');
    });

    const req = httpMock.expectOne('api/orders');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should create order', () => {
    const newOrder = {
      customerId: 2,
      orderNumber: 'ORD-002',
      total: 299.99,
      status: 'pending' as const,
      items: []
    };

    service.createOrder(newOrder).subscribe(order => {
      expect(order.orderNumber).toBe('ORD-002');
    });

    const req = httpMock.expectOne('api/orders');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newOrder);
    req.flush({ id: 2, ...newOrder, createdAt: new Date(), updatedAt: new Date() });
  });

  it('should update order status', () => {
    const orderId = 1;
    const newStatus = 'confirmed' as const;

    service.updateOrderStatus(orderId, newStatus).subscribe(order => {
      expect(order.status).toBe('confirmed');
    });

    const req = httpMock.expectOne(`api/orders/${orderId}/status`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status: newStatus });
    req.flush({ id: orderId, status: newStatus });
  });
});
