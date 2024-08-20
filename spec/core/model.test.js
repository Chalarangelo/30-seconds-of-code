/* eslint-disable no-unused-vars */
import { describe, it, expect } from 'vitest';
import Model from '#src/core/model.js';

describe('Serializer', () => {
  class User extends Model {
    static {
      Model.prepare(this, ['id']);
    }

    constructor(data) {
      super(data);
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
    }

    static yUsers(records) {
      return records.where({ email: email => email.includes('y') });
    }

    static does(records) {
      return records.where({ name: name => name.includes('Doe') });
    }
  }

  const user1 = new User({ id: 'john-doe', name: 'John Doe', email: 'x@y.z' });
  const user2 = new User({ id: 'jane-doe', name: 'Jane Doe', email: 'a@b.c' });

  describe('all', () => {
    it('returns all records', () => {
      expect(User.all).toEqual([user1, user2]);
    });
  });

  describe('where', () => {
    it('returns exact matches correctly', () => {
      expect(User.where({ id: 'john-doe' })).toEqual([user1]);
    });

    it('returns multiple matches correctly', () => {
      expect(User.where({ name: ['John Doe', 'Jane Doe'] })).toEqual([
        user1,
        user2,
      ]);
    });

    it('returns function matches correctly', () => {
      expect(User.where({ email: email => email.includes('y.z') })).toEqual([
        user1,
      ]);
    });

    it('returns multiple condition matches correctly', () => {
      expect(User.where({ id: 'john-doe', name: 'John Doe' })).toEqual([user1]);
    });

    describe('get first', () => {
      it('returns the first record', () => {
        expect(User.where({ name: 'John Doe' }).first).toEqual(user1);
      });
    });

    describe('get last', () => {
      it('returns the last record', () => {
        expect(User.where({ name: 'John Doe' }).last).toEqual(user1);
      });
    });
  });

  describe('order', () => {
    it('returns records in the correct order', () => {
      expect(User.order((a, b) => a.name.localeCompare(b.name))).toEqual([
        user2,
        user1,
      ]);
    });
  });

  describe('scope', () => {
    it('returns the correct records with a single scope', () => {
      expect(User.scope('does')).toEqual([user1, user2]);
    });

    it('returns the correct records with multiple scopes', () => {
      expect(User.scope('yUsers', 'does')).toEqual([user1]);
    });
  });

  describe('find', () => {
    it('returns the correct record', () => {
      expect(User.find('john-doe')).toEqual(user1);
    });
  });

  describe('search', () => {
    it('returns the correct record', () => {
      expect(User.search('john-doe')).toEqual(user1);
      expect(User.search('/john-doe')).toEqual(user1);
      expect(User.search('john-doe/')).toEqual(user1);
      expect(User.search('/JOHN-DoE/')).toEqual(user1);
    });
  });

  describe('searchAll', () => {
    it('returns the correct records', () => {
      expect(User.searchAll('john-doe', 'jane-doe')).toEqual([user1, user2]);
    });
  });
});
