class PageSerializer < BaseSerializer
  attributes :props, :params

  delegate :params, to: :object

  def props
    object.props.merge(structured_data: object.schema_data)
  end
end
