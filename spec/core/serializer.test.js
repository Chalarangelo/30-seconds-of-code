/* eslint-disable no-unused-vars */
import { describe, it, expect } from 'vitest';
import Serializer from '#src/core/serializer.js';

describe('Serializer', () => {
  class User {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  }

  const user = new User(1, 'John Doe', 'x@y.z');

  class UserSerializer extends Serializer {
    static {
      Serializer.prepare(this, [
        'id',
        ['fullName', 'name'],
        ['email', object => object.email.toUpperCase()],
      ]);
    }
  }

  describe('serialize', () => {
    it('returns serialized object', () => {
      const serialized = UserSerializer.serialize(user);
      expect(serialized).toEqual({
        id: 1,
        fullName: 'John Doe',
        email: 'X@Y.Z',
      });
    });
  });

  describe('serializeArray', () => {
    it('returns serialized array', () => {
      const users = [user];
      const serialized = UserSerializer.serializeArray(users);
      expect(serialized).toEqual([
        {
          id: 1,
          fullName: 'John Doe',
          email: 'X@Y.Z',
        },
      ]);
    });
  });
});
