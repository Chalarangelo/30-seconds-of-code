module WithCover
  extend ActiveSupport::Concern

  included do
    delegate :cover_url, :cover_full_url, :cover_srcset, to: :cover_presenter

    private

    def cover_presenter
      @cover_presenter ||= CoverPresenter.new(self)
    end
  end
end
