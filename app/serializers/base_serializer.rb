# Base serialization class, based on ActiveModel::Serializers::JSON
# It allows to serialize any object with a simple DSL
#
# Example:
# class UserSerializer < BaseSerializer
#   attributes :id, :name, :email
#   attribute :full_name, as: :legal_name
# end
#
# user = User.new(id: 1, name: 'John', email: 'x@y.z', full_name: 'John Doe')
#
# UserSerializer.new(user).as_json
# # => { "id" => 1, "name" => "John", "email" => "x@y.z", "legal_name" => "John Doe" }
#
# See also: https://api.rubyonrails.org/classes/ActiveModel/Serialization.html
class BaseSerializer
  include ActiveModel::Serializers::JSON

  # Make the object available to the serializer.
  attr_accessor :object, :options

  # Initialize the serializer with an object to be serialized.
  def initialize(object, options={})
    @object = object
    @options = options
  end

  # Convenience method to serialize an object.
  def self.serialize(object, options={})
    new(object, options).as_json
  end

  # Convenience method to serialize an array of objects.
  def self.serialize_array(collection, options={})
    collection.map { |object| serialize(object, options) }
  end

  # Serialize the object into a hash with indifferent access.
  def to_h
    as_json.with_indifferent_access
  end

  alias_method :original_as_json, :as_json

  # Override the default as_json method to camelize the keys.
  # Supports only, except, root etc.
  def as_json(options = nil)
    json = original_as_json(options)
    json.deep_transform_keys! { |key| key.to_s.camelize(:lower) }
  end

  # Define behavior for inherited classes.
  def self.inherited(subclass)
    # Initialize the serializable attributes.
    subclass.instance_variable_set(:@serializable_attributes, {})

    # Define a class method to add attributes to the list.
    subclass.define_singleton_method(:attributes) do |*fields|
      fields.each do |field|
        subclass.instance_variable_get(:@serializable_attributes)[field.to_s] = nil
      end
    end

    # Define an instance method for attribute serialization.
    subclass.define_method(:attributes) do
      subclass.instance_variable_get(:@serializable_attributes)
    end
  end
end
