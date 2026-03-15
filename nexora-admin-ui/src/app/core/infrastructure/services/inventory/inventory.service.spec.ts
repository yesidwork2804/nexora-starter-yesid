import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(InventoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get inventory items', () => {
    const mockInventory = [
      {
        id: 1,
        productId: 1,
        productName: 'Widget Pro',
        quantity: 50,
        minStock: 10,
        maxStock: 100,
        location: 'Warehouse A',
        lastUpdated: new Date()
      }
    ];

    service.getInventory().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].productName).toBe('Widget Pro');
    });

    const req = httpMock.expectOne('api/inventory');
    expect(req.request.method).toBe('GET');
    req.flush(mockInventory);
  });

  it('should update stock', () => {
    const itemId = 1;
    const newQuantity = 75;

    service.updateStock(itemId, newQuantity).subscribe(item => {
      expect(item.quantity).toBe(75);
    });

    const req = httpMock.expectOne(`api/inventory/${itemId}/stock`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ quantity: newQuantity });
    req.flush({ id: itemId, quantity: newQuantity });
  });

  it('should get low stock items', () => {
    const mockLowStock = [
      {
        id: 2,
        productId: 2,
        productName: 'Widget Basic',
        quantity: 5,
        minStock: 10,
        maxStock: 100,
        location: 'Warehouse B',
        lastUpdated: new Date()
      }
    ];

    service.getLowStockItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBeLessThan(items[0].minStock);
    });

    const req = httpMock.expectOne('api/inventory/low-stock');
    expect(req.request.method).toBe('GET');
    req.flush(mockLowStock);
  });

  it('should add stock movement', () => {
    const movement = {
      inventoryItemId: 1,
      type: 'in' as const,
      quantity: 25,
      reason: 'New stock received',
      createdBy: 'Admin User'
    };

    service.addStockMovement(movement).subscribe(result => {
      expect(result.inventoryItemId).toBe(1);
    });

    const req = httpMock.expectOne('api/inventory/movements');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(movement);
    req.flush({ id: 1, ...movement, createdAt: new Date() });
  });
});
