require 'rails_helper'

describe BaseSerializer do
  let!(:user) do
    class User
      attr_accessor :id, :name, :email

      def initialize(id, name, email)
        @id = id
        @name = name
        @email = email
      end
    end

    User.new(1, 'John Doe', 'x@y.z')
  end

  let!(:user_serializer) do
    class UserSerializer < BaseSerializer
      attributes :id, :full_name, :email
      alias_attribute :full_name, :name
      delegate :id, :name, :email, to: :object
    end

    UserSerializer.new(user)
  end

  context '#as_json' do
    subject { user_serializer.as_json }

    it 'returns a hash with camelized keys' do
      expect(subject).to eq({ 'id' => 1, 'fullName' => 'John Doe', 'email' => 'x@y.z' })
    end
  end

  context '#to_h' do
    subject { user_serializer.to_h }

    it 'returns a hash with indifferent access' do
      expect(subject).to eq(
        { id: 1, fullName: 'John Doe', email: 'x@y.z' }.with_indifferent_access
      )
    end
  end

  context '.serialize' do
    subject { UserSerializer.serialize(user) }

    it 'returns a hash with camelized keys' do
      expect(subject).to eq({ 'id' => 1, 'fullName' => 'John Doe', 'email' => 'x@y.z' })
    end
  end

  context '.serialize_array' do
    let!(:users) { [user, user] }

    subject { UserSerializer.serialize_array(users) }

    it 'returns an array of hashes with camelized keys' do
      expect(subject).to eq([
        { 'id' => 1, 'fullName' => 'John Doe', 'email' => 'x@y.z' },
        { 'id' => 1, 'fullName' => 'John Doe', 'email' => 'x@y.z' }
      ])
    end
  end
end
