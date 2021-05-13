import FixtureFactory from '@fixture-factory/fixture-factory';

const factory = new FixtureFactory();

factory
  .define('Sorter', () => ({
    orders: [
      { title: 'Popularity', url: '/list/p/1' },
      { title: 'Expertise', url: '/list/e/1' },
    ],
    selectedOrder: 'Popularity',
  }))
  .trait('single order', {
    orders: [{ title: 'Popularity', url: '/list/p/1' }],
  });

export default factory.package();
