import { Writable } from 'stream';
import { Logger } from './logger';

describe('Logger', () => {
  const writeFn = jest.fn();
  const originalStream = Logger.outputStream;

  beforeAll(() => {
    jest.spyOn(process.stdout, 'write').mockImplementation(writeFn);
  });

  afterEach(() => {
    writeFn.mockClear();
  });

  describe('outputStream', () => {
    it('should be a Stream.Writable', () => {
      expect(originalStream instanceof Writable).toBe(true);
    });
  });

  describe('static methods', () => {
    describe('log', () => {
      it('calls the write method of the outputStream', () => {
        Logger.log('Hello');
        expect(writeFn.mock.calls.length).toBe(1);
      });
    });

    describe('debug', () => {
      it('calls the write method of the outputStream', () => {
        Logger.debug('Hello');
        expect(writeFn.mock.calls.length).toBe(1);
      });
    });

    describe('logProcessInfo', () => {
      it('logs the appropriate number of messages', () => {
        Logger.logProcessInfo();
        expect(writeFn.mock.calls.length).toBe(6);
      });
    });
  });

  describe('instance methods', () => {
    const logger = new Logger('test');

    describe('log', () => {
      it('calls the write method of the outputStream', () => {
        logger.log('Hello');
        expect(writeFn.mock.calls.length).toBe(1);
      });

      it('prints the correct status code, process name and message', () => {
        logger.log('Hello');
        const output = writeFn.mock.calls[0][0];
        expect(output).toContain('Hello');
        expect(output).toContain('info');
        expect(output).toContain('test');
      });
    });

    describe('info', () => {
      it('calls the write method of the outputStream', () => {
        logger.info('Hello');
        expect(writeFn.mock.calls.length).toBe(1);
      });

      it('prints the correct status code, process name and message', () => {
        logger.info('Hello');
        const output = writeFn.mock.calls[0][0];
        expect(output).toContain('Hello');
        expect(output).toContain('info');
        expect(output).toContain('test');
      });
    });

    describe('success', () => {
      it('calls the write method of the outputStream', () => {
        logger.success('Hello');
        expect(writeFn.mock.calls.length).toBe(1);
      });

      it('prints the correct status code, process name and message', () => {
        logger.success('Hello');
        const output = writeFn.mock.calls[0][0];
        expect(output).toContain('Hello');
        expect(output).toContain('done');
        expect(output).toContain('test');
      });
    });

    describe('error', () => {
      it('calls the write method of the outputStream', () => {
        logger.error('Hello');
        expect(writeFn.mock.calls.length).toBe(1);
      });

      it('prints the correct status code, process name and message', () => {
        logger.error('Hello');
        const output = writeFn.mock.calls[0][0];
        expect(output).toContain('Hello');
        expect(output).toContain('err');
        expect(output).toContain('test');
      });
    });

    describe('warn', () => {
      it('calls the write method of the outputStream', () => {
        logger.warn('Hello');
        expect(writeFn.mock.calls.length).toBe(1);
      });

      it('prints the correct status code, process name and message', () => {
        logger.warn('Hello');
        const output = writeFn.mock.calls[0][0];
        expect(output).toContain('Hello');
        expect(output).toContain('warn');
        expect(output).toContain('test');
      });
    });
  });
});
