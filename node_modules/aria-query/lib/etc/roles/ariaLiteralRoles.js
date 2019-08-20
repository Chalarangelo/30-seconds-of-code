'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alertRole = require('./literal/alertRole');

var _alertRole2 = _interopRequireDefault(_alertRole);

var _alertdialogRole = require('./literal/alertdialogRole');

var _alertdialogRole2 = _interopRequireDefault(_alertdialogRole);

var _applicationRole = require('./literal/applicationRole');

var _applicationRole2 = _interopRequireDefault(_applicationRole);

var _articleRole = require('./literal/articleRole');

var _articleRole2 = _interopRequireDefault(_articleRole);

var _bannerRole = require('./literal/bannerRole');

var _bannerRole2 = _interopRequireDefault(_bannerRole);

var _buttonRole = require('./literal/buttonRole');

var _buttonRole2 = _interopRequireDefault(_buttonRole);

var _cellRole = require('./literal/cellRole');

var _cellRole2 = _interopRequireDefault(_cellRole);

var _checkboxRole = require('./literal/checkboxRole');

var _checkboxRole2 = _interopRequireDefault(_checkboxRole);

var _columnheaderRole = require('./literal/columnheaderRole');

var _columnheaderRole2 = _interopRequireDefault(_columnheaderRole);

var _comboboxRole = require('./literal/comboboxRole');

var _comboboxRole2 = _interopRequireDefault(_comboboxRole);

var _complementaryRole = require('./literal/complementaryRole');

var _complementaryRole2 = _interopRequireDefault(_complementaryRole);

var _contentinfoRole = require('./literal/contentinfoRole');

var _contentinfoRole2 = _interopRequireDefault(_contentinfoRole);

var _definitionRole = require('./literal/definitionRole');

var _definitionRole2 = _interopRequireDefault(_definitionRole);

var _dialogRole = require('./literal/dialogRole');

var _dialogRole2 = _interopRequireDefault(_dialogRole);

var _directoryRole = require('./literal/directoryRole');

var _directoryRole2 = _interopRequireDefault(_directoryRole);

var _documentRole = require('./literal/documentRole');

var _documentRole2 = _interopRequireDefault(_documentRole);

var _feedRole = require('./literal/feedRole');

var _feedRole2 = _interopRequireDefault(_feedRole);

var _figureRole = require('./literal/figureRole');

var _figureRole2 = _interopRequireDefault(_figureRole);

var _formRole = require('./literal/formRole');

var _formRole2 = _interopRequireDefault(_formRole);

var _gridRole = require('./literal/gridRole');

var _gridRole2 = _interopRequireDefault(_gridRole);

var _gridcellRole = require('./literal/gridcellRole');

var _gridcellRole2 = _interopRequireDefault(_gridcellRole);

var _groupRole = require('./literal/groupRole');

var _groupRole2 = _interopRequireDefault(_groupRole);

var _headingRole = require('./literal/headingRole');

var _headingRole2 = _interopRequireDefault(_headingRole);

var _imgRole = require('./literal/imgRole');

var _imgRole2 = _interopRequireDefault(_imgRole);

var _linkRole = require('./literal/linkRole');

var _linkRole2 = _interopRequireDefault(_linkRole);

var _listRole = require('./literal/listRole');

var _listRole2 = _interopRequireDefault(_listRole);

var _listboxRole = require('./literal/listboxRole');

var _listboxRole2 = _interopRequireDefault(_listboxRole);

var _listitemRole = require('./literal/listitemRole');

var _listitemRole2 = _interopRequireDefault(_listitemRole);

var _logRole = require('./literal/logRole');

var _logRole2 = _interopRequireDefault(_logRole);

var _mainRole = require('./literal/mainRole');

var _mainRole2 = _interopRequireDefault(_mainRole);

var _marqueeRole = require('./literal/marqueeRole');

var _marqueeRole2 = _interopRequireDefault(_marqueeRole);

var _mathRole = require('./literal/mathRole');

var _mathRole2 = _interopRequireDefault(_mathRole);

var _menuRole = require('./literal/menuRole');

var _menuRole2 = _interopRequireDefault(_menuRole);

var _menubarRole = require('./literal/menubarRole');

var _menubarRole2 = _interopRequireDefault(_menubarRole);

var _menuitemRole = require('./literal/menuitemRole');

var _menuitemRole2 = _interopRequireDefault(_menuitemRole);

var _menuitemcheckboxRole = require('./literal/menuitemcheckboxRole');

var _menuitemcheckboxRole2 = _interopRequireDefault(_menuitemcheckboxRole);

var _menuitemradioRole = require('./literal/menuitemradioRole');

var _menuitemradioRole2 = _interopRequireDefault(_menuitemradioRole);

var _navigationRole = require('./literal/navigationRole');

var _navigationRole2 = _interopRequireDefault(_navigationRole);

var _noneRole = require('./literal/noneRole');

var _noneRole2 = _interopRequireDefault(_noneRole);

var _noteRole = require('./literal/noteRole');

var _noteRole2 = _interopRequireDefault(_noteRole);

var _optionRole = require('./literal/optionRole');

var _optionRole2 = _interopRequireDefault(_optionRole);

var _presentationRole = require('./literal/presentationRole');

var _presentationRole2 = _interopRequireDefault(_presentationRole);

var _progressbarRole = require('./literal/progressbarRole');

var _progressbarRole2 = _interopRequireDefault(_progressbarRole);

var _radioRole = require('./literal/radioRole');

var _radioRole2 = _interopRequireDefault(_radioRole);

var _radiogroupRole = require('./literal/radiogroupRole');

var _radiogroupRole2 = _interopRequireDefault(_radiogroupRole);

var _regionRole = require('./literal/regionRole');

var _regionRole2 = _interopRequireDefault(_regionRole);

var _rowRole = require('./literal/rowRole');

var _rowRole2 = _interopRequireDefault(_rowRole);

var _rowgroupRole = require('./literal/rowgroupRole');

var _rowgroupRole2 = _interopRequireDefault(_rowgroupRole);

var _rowheaderRole = require('./literal/rowheaderRole');

var _rowheaderRole2 = _interopRequireDefault(_rowheaderRole);

var _scrollbarRole = require('./literal/scrollbarRole');

var _scrollbarRole2 = _interopRequireDefault(_scrollbarRole);

var _searchRole = require('./literal/searchRole');

var _searchRole2 = _interopRequireDefault(_searchRole);

var _searchboxRole = require('./literal/searchboxRole');

var _searchboxRole2 = _interopRequireDefault(_searchboxRole);

var _separatorRole = require('./literal/separatorRole');

var _separatorRole2 = _interopRequireDefault(_separatorRole);

var _sliderRole = require('./literal/sliderRole');

var _sliderRole2 = _interopRequireDefault(_sliderRole);

var _spinbuttonRole = require('./literal/spinbuttonRole');

var _spinbuttonRole2 = _interopRequireDefault(_spinbuttonRole);

var _statusRole = require('./literal/statusRole');

var _statusRole2 = _interopRequireDefault(_statusRole);

var _switchRole = require('./literal/switchRole');

var _switchRole2 = _interopRequireDefault(_switchRole);

var _tabRole = require('./literal/tabRole');

var _tabRole2 = _interopRequireDefault(_tabRole);

var _tableRole = require('./literal/tableRole');

var _tableRole2 = _interopRequireDefault(_tableRole);

var _tablistRole = require('./literal/tablistRole');

var _tablistRole2 = _interopRequireDefault(_tablistRole);

var _tabpanelRole = require('./literal/tabpanelRole');

var _tabpanelRole2 = _interopRequireDefault(_tabpanelRole);

var _termRole = require('./literal/termRole');

var _termRole2 = _interopRequireDefault(_termRole);

var _textboxRole = require('./literal/textboxRole');

var _textboxRole2 = _interopRequireDefault(_textboxRole);

var _timerRole = require('./literal/timerRole');

var _timerRole2 = _interopRequireDefault(_timerRole);

var _toolbarRole = require('./literal/toolbarRole');

var _toolbarRole2 = _interopRequireDefault(_toolbarRole);

var _tooltipRole = require('./literal/tooltipRole');

var _tooltipRole2 = _interopRequireDefault(_tooltipRole);

var _treeRole = require('./literal/treeRole');

var _treeRole2 = _interopRequireDefault(_treeRole);

var _treegridRole = require('./literal/treegridRole');

var _treegridRole2 = _interopRequireDefault(_treegridRole);

var _treeitemRole = require('./literal/treeitemRole');

var _treeitemRole2 = _interopRequireDefault(_treeitemRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ariaLiteralRoles = new Map([['alert', _alertRole2.default], ['alertdialog', _alertdialogRole2.default], ['application', _applicationRole2.default], ['article', _articleRole2.default], ['banner', _bannerRole2.default], ['button', _buttonRole2.default], ['cell', _cellRole2.default], ['checkbox', _checkboxRole2.default], ['columnheader', _columnheaderRole2.default], ['combobox', _comboboxRole2.default], ['complementary', _complementaryRole2.default], ['contentinfo', _contentinfoRole2.default], ['definition', _definitionRole2.default], ['dialog', _dialogRole2.default], ['directory', _directoryRole2.default], ['document', _documentRole2.default], ['feed', _feedRole2.default], ['figure', _figureRole2.default], ['form', _formRole2.default], ['grid', _gridRole2.default], ['gridcell', _gridcellRole2.default], ['group', _groupRole2.default], ['heading', _headingRole2.default], ['img', _imgRole2.default], ['link', _linkRole2.default], ['list', _listRole2.default], ['listbox', _listboxRole2.default], ['listitem', _listitemRole2.default], ['log', _logRole2.default], ['main', _mainRole2.default], ['marquee', _marqueeRole2.default], ['math', _mathRole2.default], ['menu', _menuRole2.default], ['menubar', _menubarRole2.default], ['menuitem', _menuitemRole2.default], ['menuitemcheckbox', _menuitemcheckboxRole2.default], ['menuitemradio', _menuitemradioRole2.default], ['navigation', _navigationRole2.default], ['none', _noneRole2.default], ['note', _noteRole2.default], ['option', _optionRole2.default], ['presentation', _presentationRole2.default], ['progressbar', _progressbarRole2.default], ['radio', _radioRole2.default], ['radiogroup', _radiogroupRole2.default], ['region', _regionRole2.default], ['row', _rowRole2.default], ['rowgroup', _rowgroupRole2.default], ['rowheader', _rowheaderRole2.default], ['scrollbar', _scrollbarRole2.default], ['search', _searchRole2.default], ['searchbox', _searchboxRole2.default], ['separator', _separatorRole2.default], ['slider', _sliderRole2.default], ['spinbutton', _spinbuttonRole2.default], ['status', _statusRole2.default], ['switch', _switchRole2.default], ['tab', _tabRole2.default], ['table', _tableRole2.default], ['tablist', _tablistRole2.default], ['tabpanel', _tabpanelRole2.default], ['term', _termRole2.default], ['textbox', _textboxRole2.default], ['timer', _timerRole2.default], ['toolbar', _toolbarRole2.default], ['tooltip', _tooltipRole2.default], ['tree', _treeRole2.default], ['treegrid', _treegridRole2.default], ['treeitem', _treeitemRole2.default]]);
exports.default = ariaLiteralRoles;