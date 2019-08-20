'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _docAbstractRole = require('./dpub/docAbstractRole');

var _docAbstractRole2 = _interopRequireDefault(_docAbstractRole);

var _docAcknowledgmentsRole = require('./dpub/docAcknowledgmentsRole');

var _docAcknowledgmentsRole2 = _interopRequireDefault(_docAcknowledgmentsRole);

var _docAfterwordRole = require('./dpub/docAfterwordRole');

var _docAfterwordRole2 = _interopRequireDefault(_docAfterwordRole);

var _docAppendixRole = require('./dpub/docAppendixRole');

var _docAppendixRole2 = _interopRequireDefault(_docAppendixRole);

var _docBacklinkRole = require('./dpub/docBacklinkRole');

var _docBacklinkRole2 = _interopRequireDefault(_docBacklinkRole);

var _docBiblioentryRole = require('./dpub/docBiblioentryRole');

var _docBiblioentryRole2 = _interopRequireDefault(_docBiblioentryRole);

var _docBibliographyRole = require('./dpub/docBibliographyRole');

var _docBibliographyRole2 = _interopRequireDefault(_docBibliographyRole);

var _docBibliorefRole = require('./dpub/docBibliorefRole');

var _docBibliorefRole2 = _interopRequireDefault(_docBibliorefRole);

var _docChapterRole = require('./dpub/docChapterRole');

var _docChapterRole2 = _interopRequireDefault(_docChapterRole);

var _docColophonRole = require('./dpub/docColophonRole');

var _docColophonRole2 = _interopRequireDefault(_docColophonRole);

var _docConclusionRole = require('./dpub/docConclusionRole');

var _docConclusionRole2 = _interopRequireDefault(_docConclusionRole);

var _docCoverRole = require('./dpub/docCoverRole');

var _docCoverRole2 = _interopRequireDefault(_docCoverRole);

var _docCreditRole = require('./dpub/docCreditRole');

var _docCreditRole2 = _interopRequireDefault(_docCreditRole);

var _docCreditsRole = require('./dpub/docCreditsRole');

var _docCreditsRole2 = _interopRequireDefault(_docCreditsRole);

var _docDedicationRole = require('./dpub/docDedicationRole');

var _docDedicationRole2 = _interopRequireDefault(_docDedicationRole);

var _docEndnoteRole = require('./dpub/docEndnoteRole');

var _docEndnoteRole2 = _interopRequireDefault(_docEndnoteRole);

var _docEndnotesRole = require('./dpub/docEndnotesRole');

var _docEndnotesRole2 = _interopRequireDefault(_docEndnotesRole);

var _docEpigraphRole = require('./dpub/docEpigraphRole');

var _docEpigraphRole2 = _interopRequireDefault(_docEpigraphRole);

var _docEpilogueRole = require('./dpub/docEpilogueRole');

var _docEpilogueRole2 = _interopRequireDefault(_docEpilogueRole);

var _docErrataRole = require('./dpub/docErrataRole');

var _docErrataRole2 = _interopRequireDefault(_docErrataRole);

var _docExampleRole = require('./dpub/docExampleRole');

var _docExampleRole2 = _interopRequireDefault(_docExampleRole);

var _docFootnoteRole = require('./dpub/docFootnoteRole');

var _docFootnoteRole2 = _interopRequireDefault(_docFootnoteRole);

var _docForewordRole = require('./dpub/docForewordRole');

var _docForewordRole2 = _interopRequireDefault(_docForewordRole);

var _docGlossaryRole = require('./dpub/docGlossaryRole');

var _docGlossaryRole2 = _interopRequireDefault(_docGlossaryRole);

var _docGlossrefRole = require('./dpub/docGlossrefRole');

var _docGlossrefRole2 = _interopRequireDefault(_docGlossrefRole);

var _docIndexRole = require('./dpub/docIndexRole');

var _docIndexRole2 = _interopRequireDefault(_docIndexRole);

var _docIntroductionRole = require('./dpub/docIntroductionRole');

var _docIntroductionRole2 = _interopRequireDefault(_docIntroductionRole);

var _docNoterefRole = require('./dpub/docNoterefRole');

var _docNoterefRole2 = _interopRequireDefault(_docNoterefRole);

var _docNoticeRole = require('./dpub/docNoticeRole');

var _docNoticeRole2 = _interopRequireDefault(_docNoticeRole);

var _docPagebreakRole = require('./dpub/docPagebreakRole');

var _docPagebreakRole2 = _interopRequireDefault(_docPagebreakRole);

var _docPagelistRole = require('./dpub/docPagelistRole');

var _docPagelistRole2 = _interopRequireDefault(_docPagelistRole);

var _docPartRole = require('./dpub/docPartRole');

var _docPartRole2 = _interopRequireDefault(_docPartRole);

var _docPrefaceRole = require('./dpub/docPrefaceRole');

var _docPrefaceRole2 = _interopRequireDefault(_docPrefaceRole);

var _docPrologueRole = require('./dpub/docPrologueRole');

var _docPrologueRole2 = _interopRequireDefault(_docPrologueRole);

var _docPullquoteRole = require('./dpub/docPullquoteRole');

var _docPullquoteRole2 = _interopRequireDefault(_docPullquoteRole);

var _docQnaRole = require('./dpub/docQnaRole');

var _docQnaRole2 = _interopRequireDefault(_docQnaRole);

var _docSubtitleRole = require('./dpub/docSubtitleRole');

var _docSubtitleRole2 = _interopRequireDefault(_docSubtitleRole);

var _docTipRole = require('./dpub/docTipRole');

var _docTipRole2 = _interopRequireDefault(_docTipRole);

var _docTocRole = require('./dpub/docTocRole');

var _docTocRole2 = _interopRequireDefault(_docTocRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ariaDpubRoles = new Map([['doc-abstract', _docAbstractRole2.default], ['doc-acknowledgments', _docAcknowledgmentsRole2.default], ['doc-afterword', _docAfterwordRole2.default], ['doc-appendix', _docAppendixRole2.default], ['doc-backlink', _docBacklinkRole2.default], ['doc-biblioentry', _docBiblioentryRole2.default], ['doc-bibliography', _docBibliographyRole2.default], ['doc-biblioref', _docBibliorefRole2.default], ['doc-chapter', _docChapterRole2.default], ['doc-colophon', _docColophonRole2.default], ['doc-conclusion', _docConclusionRole2.default], ['doc-cover', _docCoverRole2.default], ['doc-credit', _docCreditRole2.default], ['doc-credits', _docCreditsRole2.default], ['doc-dedication', _docDedicationRole2.default], ['doc-endnote', _docEndnoteRole2.default], ['doc-endnotes', _docEndnotesRole2.default], ['doc-epigraph', _docEpigraphRole2.default], ['doc-epilogue', _docEpilogueRole2.default], ['doc-errata', _docErrataRole2.default], ['doc-example', _docExampleRole2.default], ['doc-footnote', _docFootnoteRole2.default], ['doc-foreword', _docForewordRole2.default], ['doc-glossary', _docGlossaryRole2.default], ['doc-glossref', _docGlossrefRole2.default], ['doc-index', _docIndexRole2.default], ['doc-introduction', _docIntroductionRole2.default], ['doc-noteref', _docNoterefRole2.default], ['doc-notice', _docNoticeRole2.default], ['doc-pagebreak', _docPagebreakRole2.default], ['doc-pagelist', _docPagelistRole2.default], ['doc-part', _docPartRole2.default], ['doc-preface', _docPrefaceRole2.default], ['doc-prologue', _docPrologueRole2.default], ['doc-pullquote', _docPullquoteRole2.default], ['doc-qna', _docQnaRole2.default], ['doc-subtitle', _docSubtitleRole2.default], ['doc-tip', _docTipRole2.default], ['doc-toc', _docTocRole2.default]]);
exports.default = ariaDpubRoles;