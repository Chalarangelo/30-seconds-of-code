PreparedQueries.instance_methods.each do |method|
  define_method(method) do |*args|
    PreparedQueries.instance_method(method).bind(self).call(*args)
  end
end

# More ideas here: https://medium.com/simply-dev/do-more-with-rails-console-by-configuring-irbrc-e5c25284305d
