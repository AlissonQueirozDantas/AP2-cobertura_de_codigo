// __tests__/order.test.js
const { Order, Item } = require('../src/order');

describe('Item', () => {
  test('cria item corretamente', () => {
    const item = new Item(3, 'Produto C', 15);
    expect(item.id).toBe(3);
    expect(item.name).toBe('Produto C');
    expect(item.price).toBe(15);
  });
});

describe('Order', () => {
  let order;
  let item1, item2;

  beforeEach(() => {
    item1 = new Item(1, 'Produto A', 10);
    item2 = new Item(2, 'Produto B', 20);
    order = new Order(1, [item1]);
  });

  // Testes de fluxo normal
  test('calcula total corretamente ao criar', () => {
    expect(order.total).toBe(10);
  });

  test('adiciona item corretamente', () => {
    order.addItem(item2);
    expect(order.items).toContain(item2);
    expect(order.total).toBe(30);
  });

  test('remove item corretamente', () => {
    order.removeItem(item1.id);
    expect(order.items).not.toContain(item1);
    expect(order.total).toBe(0);
  });

  test('paga pedido corretamente', () => {
    order.pay();
    expect(order.status).toBe('paid');
  });

  test('não paga pedido se não estiver no status created', () => {
    order.pay();
    expect(() => order.pay()).toThrow('Order cannot be paid');
  });

  test('completa pedido corretamente', () => {
    order.pay();
    order.complete();
    expect(order.status).toBe('completed');
  });

  test('não completa pedido se não estiver pago', () => {
    expect(() => order.complete()).toThrow(
      'Order must be paid before it can be completed'
    );
  });

  test('cancela pedido corretamente', () => {
    order.cancel();
    expect(order.status).toBe('cancelled');
  });

  test('não cancela pedido completo', () => {
    order.pay();
    order.complete();
    expect(() => order.cancel()).toThrow(
      'Completed order cannot be cancelled'
    );
  });

  test('calculateTotal com múltiplos itens', () => {
    order.addItem(item2);
    expect(order.calculateTotal()).toBe(30);
  });
});
