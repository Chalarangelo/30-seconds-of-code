module Memoizable
  extend ActiveSupport::Concern

  included do
    after_initialize do
      memoized_methods = self.class.instance_variable_get(:@memoized_methods)

      memoized_methods.each do |method|
        ends_with_question_mark = method.to_s.end_with?('?')
        non_memoized_method =
          if ends_with_question_mark
            "#{method.to_s.chop}_non_memoized?"
          else
            "#{method}_non_memoized"
          end

        method_variable =
          if ends_with_question_mark
            "@#{method.to_s.chop}_memoized"
          else
            "@#{method}_memoized"
          end

        # Alias the original method so that we can call it from the memoized
        self.singleton_class.send(:alias_method, non_memoized_method, method)
        # Define the memoized method that will call the original method
        self.singleton_class.send(:define_method, method) do
          if instance_variable_defined?(method_variable)
            instance_variable_get(method_variable)
          else
            instance_variable_set(method_variable, send(non_memoized_method))
          end
        end
      end
    end
  end

  def reload
    super
    self.class.instance_variable_get(:@memoized_methods).each do |method|
      ends_with_question_mark = method.to_s.end_with?('?')
      method_variable =
        if ends_with_question_mark
          "@#{method.to_s.chop}_memoized"
        else
          "@#{method}_memoized"
        end

      instance_variable_set(method_variable, nil)
    end
  end

  class_methods do
    # Memoize the given methods. The methods will be memoized after the
    # instance is initialized.
    #
    # @param methods [Array<Symbol>] the methods to memoize.
    def memo(*methods)
      # Due to the way the after_initialize callback works, we need to memoize
      # the methods in a class instance variable, so that we can alias and define
      # the methods in the after_initialize callback.
      instance_variable_get(:@memoized_methods) ||
        instance_variable_set(:@memoized_methods, []).
        tap do |memoized_methods|
          memoized_methods.concat(methods)
          memoized_methods.uniq!
        end
    end
  end
end
