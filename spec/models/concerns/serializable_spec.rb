require 'rails_helper'

describe Serializable do
  let!(:snippet) do
    FactoryBot.create(
      :snippet,
      cid: 'js/my-snippet'
    )
  end

  let!(:collection) do
    FactoryBot.create(
      :collection,
      cid: 'js/array'
    )
  end

  let!(:dummy_serializer) do
    class DummySerializer < BaseSerializer
      attributes :cid

      delegate :cid, to: :object
    end
  end

  describe '#serialize_as' do
    it 'serializes the object using the specified serializer', :aggregate_failures do
      expect(snippet.serialize_as(:dummy)).to eq(
        'cid' => snippet.cid
      )
      expect(collection.serialize_as(:dummy)).to eq(
        'cid' => collection.cid
      )
    end

    it 'returns a hash if the hash option is true' do
      expect(snippet.serialize_as(:dummy, hash: true)[:cid]).to eq(snippet.cid)
    end
  end

  describe '#context' do
    it 'returns the snippet context for snippets' do
      expect(snippet.context).to eq(snippet.serialize_as(:snippet_context))
    end

    it 'returns the collection context for collections' do
      expect(collection.context).to eq(collection.serialize_as(:collection_context))
    end
  end
end
