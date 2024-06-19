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

  # Define a list of attributes to be serialized.
  def self.attributes(*fields)
    fields.each do |field|
      attribute(field, as: field)
    end
  end

  # Define a single attribute to be serialized, with an alias (optional).
  def self.attribute(field, as: nil)
    add_serializable_attribute(field, as: as)
    create_serializable_field(field, as: as)
  end

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

  # Serialize the object into a hash (needs to return string keys).
  def attributes(*args)
    self.
      class.
      instance_variable_get(:@serializable_attributes).
      each_with_object({}) do |field_data, hash|
        as, field = field_data
        # The inclusion check needs to happen here in order to prevent overriden
        # methods from skipping it.
        include_method = "include_#{field}?"
        hash[as.to_s] =
          if self.respond_to?(include_method) && !send(include_method)
            nil
          else
            send(as)
          end
      end.
      compact
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

  private

  # Create a new field that can be serialized.
  def self.create_serializable_field(field, as: nil)
    as ||= field

    attr_accessor as

    # Define a method that will be used to serialize the field.
    define_method as do
      # Try to call the field but only if you're not calling yourself.
      if self.respond_to?(field) && method(field) != method(as)
        send(field)
      # Try to call the field on the object.
      elsif object.respond_to?(field)
        object.send(field)
      # Try to call the field with the object.
      elsif field.respond_to?(:call)
        field.call(object)
      # Try to call the field on the object as a hash.
      elsif object.respond_to?(:key?) && object.key?(field)
        object[field]
      end
    end
  end

  # Add a new field to the list of serializable attributes.
  def self.add_serializable_attribute(field, as: nil)
    as ||= field

    if !self.instance_variable_defined?(:@serializable_attributes) ||
        self.instance_variable_get(:@serializable_attributes).blank?
      self.instance_variable_set(:@serializable_attributes, {})
    end

    self.instance_variable_get(:@serializable_attributes)[as] = field
  end
end
