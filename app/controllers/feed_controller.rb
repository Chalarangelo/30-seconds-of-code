class FeedController < ApplicationController
  def index
    @nodes = nodes
  end

  def generate_feed
    feed = render_to_string 'feed/index', layout: false, locals: { nodes: nodes }
    File.write('public/feed.xml', feed)
  end

  def nodes
    Snippet.listed.by_new.first(50)
  end
end
