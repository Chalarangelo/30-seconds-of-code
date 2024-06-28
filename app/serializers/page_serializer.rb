class PageSerializer < BaseSerializer
  attributes :props, :params

  def props
    object.props.merge(structured_data: object.schema_data)
  end
end
