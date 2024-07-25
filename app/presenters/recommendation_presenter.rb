class RecommendationPresenter
  # Language
  LANGUAGE_SCORE_LIMIT = 45.0
  FULL_LANGUAGE_SCORE = 45.0
  # Primary Tag
  PRIMARY_TAG_SCORE_LIMIT = 15.0
  FULL_PRIMARY_TAG_SCORE = 15.0
  # Rounded up to 8 instead of 7.5
  HALF_PRIMARY_TAG_SCORE = 8.0
  # Search tokens
  SEARCH_TOKEN_SCORE_LIMIT = 40.0
  # Total
  # Language + Primary Tag + Search Tokens
  TOTAL_SCORE_LIMIT = 100.0
  # Total without language
  # Primary Tag + Search Tokens / Total
  SCORE_LIMIT_WITHOUT_LANGUAGE = 0.55
  # Total without language and primary tag
  # Search Tokens / Total
  SCORE_LIMIT_WITHOUT_LANGUAGE_AND_PRIMARY_TAG = 0.4
  RECOMMENDATION_COUNT = 4

  attr_reader :object, :options, :cid, :slug_id, :language_cid, :primary_tag,
              :search_tokens_array, :is_listed, :search_tokens_size,
              :recommendation_rankings, :min_rankings

  # Cache the recommendable snippets on the class to avoid multiple queries.
  @@recommendable_snippets = nil
  @@recommendable_snippets_by_language = {}
  @@recommendable_snippets_by_language_and_primary_tag = {}

  # Ugly but efficient optimization strategy to first check the most relevant snippets.
  def self.prepare_recommendable_snippets
    @@recommendable_snippets = Snippet.preload(:language).published.ranked.group_by(&:language_cid)

    @@recommendable_snippets.each do |language_cid, snippets|
      @@recommendable_snippets_by_language[language_cid] =
        snippets + @@recommendable_snippets.except(language_cid).values.flatten

      @@recommendable_snippets_by_language_and_primary_tag[language_cid] = {}

      tag_grouped_snippets = snippets.group_by { |s| s.primary_tag }
      tag_grouped_snippets.each do |primary_tag, primary_tag_snippets|
        @@recommendable_snippets_by_language_and_primary_tag[language_cid][primary_tag] =
          primary_tag_snippets +
          tag_grouped_snippets.except(primary_tag).values.flatten +
          @@recommendable_snippets.except(language_cid).values.flatten
      end
    end

    @@recommendable_snippets = @@recommendable_snippets.values.flatten
  end

  def self.recommendable_snippets(language = nil, tag = nil)
    prepare_recommendable_snippets if @@recommendable_snippets.blank?

    return @@recommendable_snippets if language.blank?

    return @@recommendable_snippets_by_language[language] unless tag.present? &&
      @@recommendable_snippets_by_language_and_primary_tag[language].key?(tag)

    @@recommendable_snippets_by_language_and_primary_tag[language][tag]
  end

  def initialize(object, options: {})
    @object = object
    @options = options

    @cid = object.cid
    @slug_id = object.slug_id
    @language_cid = object.language_cid
    @primary_tag = object.primary_tag
    @search_tokens_array = object.search_tokens_array
    @is_listed = object.is_listed?
    @search_tokens_size = @search_tokens_array.size
    @recommendation_rankings = {}
    @min_rankings = []
  end

  def recommend_snippets
    recommendable_snippets = RecommendationPresenter.recommendable_snippets(language_cid, primary_tag)

    recommendable_snippets.each do |snippet|
      # Skip if the snippet is the same as the current snippet
      next if snippet.cid == cid
      # Skip if the snippet is the same in another language
      next if snippet.slug_id == slug_id
      # Skip unless this snippet is listed or the object is unlisted
      next unless !is_listed || snippet.is_listed?

      # Store the minimum ranking so far
      min_ranking = min_rankings.first || 0.0

      # Performance optimization - if language score is 0 and the minimum
      # recommendation score is greater than the score limit without language,
      # then we can skip the rest of the calculations.
      is_same_language = snippet.language_cid == language_cid
      next if !is_same_language &&
        min_ranking > SCORE_LIMIT_WITHOUT_LANGUAGE

      # Determine score for language:
      #  * Same language, as language = 100% of language score
      #  * Not same language = 0% of language score
      language_score = is_same_language ? FULL_LANGUAGE_SCORE : 0

      # Performance optimization - if both language and primary tag scores are
      # 0 and the minimum recommendation score is greater than the score limit
      # without language and primary tag, then we can skip the rest of the
      # calculations.
      primary_tag_index =
        is_same_language ? snippet.tags.index(primary_tag) : nil

      next if !is_same_language &&
        primary_tag_index.blank? &&
        min_ranking > SCORE_LIMIT_WITHOUT_LANGUAGE_AND_PRIMARY_TAG

      # Determine primary tag score:
      #  * Different language = 0% of tag score
      #  * Same primary tag = 100% of tag score
      #  * Contains primary tag, but not primary = 50% of tag score
      #  * Doesn't contain tag = 0% of language score
      primary_tag_score =
        if primary_tag_index.blank?
          0
        else
          primary_tag_index == 0 ? FULL_PRIMARY_TAG_SCORE :
                      HALF_PRIMARY_TAG_SCORE
        end

      # Determine search token score:
      #  * Count found tokens and divide by total number of tokens
      matched_tokens_count = (search_tokens_array & snippet.search_tokens_array).size
      search_token_score =
        (matched_tokens_count.to_f / search_tokens_size) * SEARCH_TOKEN_SCORE_LIMIT

      # Divide by the limit to get a value between 0 and 1
      recommendation_ranking =
        (language_score + primary_tag_score + search_token_score).to_f /
        TOTAL_SCORE_LIMIT

      # Performance optimization to minimize the number of times we have to
      # sort afterwards. As soon as the minimum amount of snippets has been
      # considered, we can start trimming off any snippets below the lowest
      # snippet's recommendation ranking.
      if recommendation_ranking > 0
        if min_rankings.size < RECOMMENDATION_COUNT
          # First 4 snippets are always added
          min_rankings << recommendation_ranking
        else
          # If the new ranking is lower than the lowest ranking, ignore it
          next if recommendation_ranking < min_rankings.first

          # Otherwise, replace the lowest ranking with the new ranking
          min_rankings[0] = recommendation_ranking
        end
        min_rankings.sort!

        recommendation_rankings[snippet.id] = [
          recommendation_ranking, snippet.ranking, snippet
        ]
      end
    end

    recommendation_rankings.
      sort do |a, b|
        a[1] <=> b[1] || a[2] <=> b[2]
      end.
      reverse.
      first(RECOMMENDATION_COUNT).
      map { |s| s.last.last }
  end
end
