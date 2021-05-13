import FixtureFactory from '@fixture-factory/fixture-factory';

const factory = new FixtureFactory();

factory
  .define('Paginator', () => ({
    totalPages: 7,
    pageNumber: 3,
    baseUrl: '/list',
  }))
  .trait('first page', { pageNumber: 1 })
  .trait('last page', { pageNumber: 7 })
  .trait('few pages', { pageNumber: 1, totalPages: 2 })
  .trait('single page', { pageNumber: 1, totalPages: 1 });

export default factory.package();
