class PageSerializer < BaseSerializer
  attributes :params, :props

  def props
    object.props.merge(schema_data: object.schema_data)
  end
end
