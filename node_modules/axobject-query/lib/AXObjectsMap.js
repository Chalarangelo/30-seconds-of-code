'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbbrRole = require('./etc/objects/AbbrRole');

var _AbbrRole2 = _interopRequireDefault(_AbbrRole);

var _AlertDialogRole = require('./etc/objects/AlertDialogRole');

var _AlertDialogRole2 = _interopRequireDefault(_AlertDialogRole);

var _AlertRole = require('./etc/objects/AlertRole');

var _AlertRole2 = _interopRequireDefault(_AlertRole);

var _AnnotationRole = require('./etc/objects/AnnotationRole');

var _AnnotationRole2 = _interopRequireDefault(_AnnotationRole);

var _ApplicationRole = require('./etc/objects/ApplicationRole');

var _ApplicationRole2 = _interopRequireDefault(_ApplicationRole);

var _ArticleRole = require('./etc/objects/ArticleRole');

var _ArticleRole2 = _interopRequireDefault(_ArticleRole);

var _AudioRole = require('./etc/objects/AudioRole');

var _AudioRole2 = _interopRequireDefault(_AudioRole);

var _BannerRole = require('./etc/objects/BannerRole');

var _BannerRole2 = _interopRequireDefault(_BannerRole);

var _BlockquoteRole = require('./etc/objects/BlockquoteRole');

var _BlockquoteRole2 = _interopRequireDefault(_BlockquoteRole);

var _BusyIndicatorRole = require('./etc/objects/BusyIndicatorRole');

var _BusyIndicatorRole2 = _interopRequireDefault(_BusyIndicatorRole);

var _ButtonRole = require('./etc/objects/ButtonRole');

var _ButtonRole2 = _interopRequireDefault(_ButtonRole);

var _CanvasRole = require('./etc/objects/CanvasRole');

var _CanvasRole2 = _interopRequireDefault(_CanvasRole);

var _CaptionRole = require('./etc/objects/CaptionRole');

var _CaptionRole2 = _interopRequireDefault(_CaptionRole);

var _CellRole = require('./etc/objects/CellRole');

var _CellRole2 = _interopRequireDefault(_CellRole);

var _CheckBoxRole = require('./etc/objects/CheckBoxRole');

var _CheckBoxRole2 = _interopRequireDefault(_CheckBoxRole);

var _ColorWellRole = require('./etc/objects/ColorWellRole');

var _ColorWellRole2 = _interopRequireDefault(_ColorWellRole);

var _ColumnHeaderRole = require('./etc/objects/ColumnHeaderRole');

var _ColumnHeaderRole2 = _interopRequireDefault(_ColumnHeaderRole);

var _ColumnRole = require('./etc/objects/ColumnRole');

var _ColumnRole2 = _interopRequireDefault(_ColumnRole);

var _ComboBoxRole = require('./etc/objects/ComboBoxRole');

var _ComboBoxRole2 = _interopRequireDefault(_ComboBoxRole);

var _ComplementaryRole = require('./etc/objects/ComplementaryRole');

var _ComplementaryRole2 = _interopRequireDefault(_ComplementaryRole);

var _ContentInfoRole = require('./etc/objects/ContentInfoRole');

var _ContentInfoRole2 = _interopRequireDefault(_ContentInfoRole);

var _DateRole = require('./etc/objects/DateRole');

var _DateRole2 = _interopRequireDefault(_DateRole);

var _DateTimeRole = require('./etc/objects/DateTimeRole');

var _DateTimeRole2 = _interopRequireDefault(_DateTimeRole);

var _DefinitionRole = require('./etc/objects/DefinitionRole');

var _DefinitionRole2 = _interopRequireDefault(_DefinitionRole);

var _DescriptionListDetailRole = require('./etc/objects/DescriptionListDetailRole');

var _DescriptionListDetailRole2 = _interopRequireDefault(_DescriptionListDetailRole);

var _DescriptionListRole = require('./etc/objects/DescriptionListRole');

var _DescriptionListRole2 = _interopRequireDefault(_DescriptionListRole);

var _DescriptionListTermRole = require('./etc/objects/DescriptionListTermRole');

var _DescriptionListTermRole2 = _interopRequireDefault(_DescriptionListTermRole);

var _DetailsRole = require('./etc/objects/DetailsRole');

var _DetailsRole2 = _interopRequireDefault(_DetailsRole);

var _DialogRole = require('./etc/objects/DialogRole');

var _DialogRole2 = _interopRequireDefault(_DialogRole);

var _DirectoryRole = require('./etc/objects/DirectoryRole');

var _DirectoryRole2 = _interopRequireDefault(_DirectoryRole);

var _DisclosureTriangleRole = require('./etc/objects/DisclosureTriangleRole');

var _DisclosureTriangleRole2 = _interopRequireDefault(_DisclosureTriangleRole);

var _DivRole = require('./etc/objects/DivRole');

var _DivRole2 = _interopRequireDefault(_DivRole);

var _DocumentRole = require('./etc/objects/DocumentRole');

var _DocumentRole2 = _interopRequireDefault(_DocumentRole);

var _EmbeddedObjectRole = require('./etc/objects/EmbeddedObjectRole');

var _EmbeddedObjectRole2 = _interopRequireDefault(_EmbeddedObjectRole);

var _FeedRole = require('./etc/objects/FeedRole');

var _FeedRole2 = _interopRequireDefault(_FeedRole);

var _FigcaptionRole = require('./etc/objects/FigcaptionRole');

var _FigcaptionRole2 = _interopRequireDefault(_FigcaptionRole);

var _FigureRole = require('./etc/objects/FigureRole');

var _FigureRole2 = _interopRequireDefault(_FigureRole);

var _FooterRole = require('./etc/objects/FooterRole');

var _FooterRole2 = _interopRequireDefault(_FooterRole);

var _FormRole = require('./etc/objects/FormRole');

var _FormRole2 = _interopRequireDefault(_FormRole);

var _GridRole = require('./etc/objects/GridRole');

var _GridRole2 = _interopRequireDefault(_GridRole);

var _GroupRole = require('./etc/objects/GroupRole');

var _GroupRole2 = _interopRequireDefault(_GroupRole);

var _HeadingRole = require('./etc/objects/HeadingRole');

var _HeadingRole2 = _interopRequireDefault(_HeadingRole);

var _IframePresentationalRole = require('./etc/objects/IframePresentationalRole');

var _IframePresentationalRole2 = _interopRequireDefault(_IframePresentationalRole);

var _IframeRole = require('./etc/objects/IframeRole');

var _IframeRole2 = _interopRequireDefault(_IframeRole);

var _IgnoredRole = require('./etc/objects/IgnoredRole');

var _IgnoredRole2 = _interopRequireDefault(_IgnoredRole);

var _ImageMapLinkRole = require('./etc/objects/ImageMapLinkRole');

var _ImageMapLinkRole2 = _interopRequireDefault(_ImageMapLinkRole);

var _ImageMapRole = require('./etc/objects/ImageMapRole');

var _ImageMapRole2 = _interopRequireDefault(_ImageMapRole);

var _ImageRole = require('./etc/objects/ImageRole');

var _ImageRole2 = _interopRequireDefault(_ImageRole);

var _InlineTextBoxRole = require('./etc/objects/InlineTextBoxRole');

var _InlineTextBoxRole2 = _interopRequireDefault(_InlineTextBoxRole);

var _InputTimeRole = require('./etc/objects/InputTimeRole');

var _InputTimeRole2 = _interopRequireDefault(_InputTimeRole);

var _LabelRole = require('./etc/objects/LabelRole');

var _LabelRole2 = _interopRequireDefault(_LabelRole);

var _LegendRole = require('./etc/objects/LegendRole');

var _LegendRole2 = _interopRequireDefault(_LegendRole);

var _LineBreakRole = require('./etc/objects/LineBreakRole');

var _LineBreakRole2 = _interopRequireDefault(_LineBreakRole);

var _LinkRole = require('./etc/objects/LinkRole');

var _LinkRole2 = _interopRequireDefault(_LinkRole);

var _ListBoxOptionRole = require('./etc/objects/ListBoxOptionRole');

var _ListBoxOptionRole2 = _interopRequireDefault(_ListBoxOptionRole);

var _ListBoxRole = require('./etc/objects/ListBoxRole');

var _ListBoxRole2 = _interopRequireDefault(_ListBoxRole);

var _ListItemRole = require('./etc/objects/ListItemRole');

var _ListItemRole2 = _interopRequireDefault(_ListItemRole);

var _ListMarkerRole = require('./etc/objects/ListMarkerRole');

var _ListMarkerRole2 = _interopRequireDefault(_ListMarkerRole);

var _ListRole = require('./etc/objects/ListRole');

var _ListRole2 = _interopRequireDefault(_ListRole);

var _LogRole = require('./etc/objects/LogRole');

var _LogRole2 = _interopRequireDefault(_LogRole);

var _MainRole = require('./etc/objects/MainRole');

var _MainRole2 = _interopRequireDefault(_MainRole);

var _MarkRole = require('./etc/objects/MarkRole');

var _MarkRole2 = _interopRequireDefault(_MarkRole);

var _MarqueeRole = require('./etc/objects/MarqueeRole');

var _MarqueeRole2 = _interopRequireDefault(_MarqueeRole);

var _MathRole = require('./etc/objects/MathRole');

var _MathRole2 = _interopRequireDefault(_MathRole);

var _MenuBarRole = require('./etc/objects/MenuBarRole');

var _MenuBarRole2 = _interopRequireDefault(_MenuBarRole);

var _MenuButtonRole = require('./etc/objects/MenuButtonRole');

var _MenuButtonRole2 = _interopRequireDefault(_MenuButtonRole);

var _MenuItemRole = require('./etc/objects/MenuItemRole');

var _MenuItemRole2 = _interopRequireDefault(_MenuItemRole);

var _MenuItemCheckBoxRole = require('./etc/objects/MenuItemCheckBoxRole');

var _MenuItemCheckBoxRole2 = _interopRequireDefault(_MenuItemCheckBoxRole);

var _MenuItemRadioRole = require('./etc/objects/MenuItemRadioRole');

var _MenuItemRadioRole2 = _interopRequireDefault(_MenuItemRadioRole);

var _MenuListOptionRole = require('./etc/objects/MenuListOptionRole');

var _MenuListOptionRole2 = _interopRequireDefault(_MenuListOptionRole);

var _MenuListPopupRole = require('./etc/objects/MenuListPopupRole');

var _MenuListPopupRole2 = _interopRequireDefault(_MenuListPopupRole);

var _MenuRole = require('./etc/objects/MenuRole');

var _MenuRole2 = _interopRequireDefault(_MenuRole);

var _MeterRole = require('./etc/objects/MeterRole');

var _MeterRole2 = _interopRequireDefault(_MeterRole);

var _NavigationRole = require('./etc/objects/NavigationRole');

var _NavigationRole2 = _interopRequireDefault(_NavigationRole);

var _NoneRole = require('./etc/objects/NoneRole');

var _NoneRole2 = _interopRequireDefault(_NoneRole);

var _NoteRole = require('./etc/objects/NoteRole');

var _NoteRole2 = _interopRequireDefault(_NoteRole);

var _OutlineRole = require('./etc/objects/OutlineRole');

var _OutlineRole2 = _interopRequireDefault(_OutlineRole);

var _ParagraphRole = require('./etc/objects/ParagraphRole');

var _ParagraphRole2 = _interopRequireDefault(_ParagraphRole);

var _PopUpButtonRole = require('./etc/objects/PopUpButtonRole');

var _PopUpButtonRole2 = _interopRequireDefault(_PopUpButtonRole);

var _PreRole = require('./etc/objects/PreRole');

var _PreRole2 = _interopRequireDefault(_PreRole);

var _PresentationalRole = require('./etc/objects/PresentationalRole');

var _PresentationalRole2 = _interopRequireDefault(_PresentationalRole);

var _ProgressIndicatorRole = require('./etc/objects/ProgressIndicatorRole');

var _ProgressIndicatorRole2 = _interopRequireDefault(_ProgressIndicatorRole);

var _RadioButtonRole = require('./etc/objects/RadioButtonRole');

var _RadioButtonRole2 = _interopRequireDefault(_RadioButtonRole);

var _RadioGroupRole = require('./etc/objects/RadioGroupRole');

var _RadioGroupRole2 = _interopRequireDefault(_RadioGroupRole);

var _RegionRole = require('./etc/objects/RegionRole');

var _RegionRole2 = _interopRequireDefault(_RegionRole);

var _RootWebAreaRole = require('./etc/objects/RootWebAreaRole');

var _RootWebAreaRole2 = _interopRequireDefault(_RootWebAreaRole);

var _RowHeaderRole = require('./etc/objects/RowHeaderRole');

var _RowHeaderRole2 = _interopRequireDefault(_RowHeaderRole);

var _RowRole = require('./etc/objects/RowRole');

var _RowRole2 = _interopRequireDefault(_RowRole);

var _RubyRole = require('./etc/objects/RubyRole');

var _RubyRole2 = _interopRequireDefault(_RubyRole);

var _RulerRole = require('./etc/objects/RulerRole');

var _RulerRole2 = _interopRequireDefault(_RulerRole);

var _ScrollAreaRole = require('./etc/objects/ScrollAreaRole');

var _ScrollAreaRole2 = _interopRequireDefault(_ScrollAreaRole);

var _ScrollBarRole = require('./etc/objects/ScrollBarRole');

var _ScrollBarRole2 = _interopRequireDefault(_ScrollBarRole);

var _SeamlessWebAreaRole = require('./etc/objects/SeamlessWebAreaRole');

var _SeamlessWebAreaRole2 = _interopRequireDefault(_SeamlessWebAreaRole);

var _SearchRole = require('./etc/objects/SearchRole');

var _SearchRole2 = _interopRequireDefault(_SearchRole);

var _SearchBoxRole = require('./etc/objects/SearchBoxRole');

var _SearchBoxRole2 = _interopRequireDefault(_SearchBoxRole);

var _SliderRole = require('./etc/objects/SliderRole');

var _SliderRole2 = _interopRequireDefault(_SliderRole);

var _SliderThumbRole = require('./etc/objects/SliderThumbRole');

var _SliderThumbRole2 = _interopRequireDefault(_SliderThumbRole);

var _SpinButtonRole = require('./etc/objects/SpinButtonRole');

var _SpinButtonRole2 = _interopRequireDefault(_SpinButtonRole);

var _SpinButtonPartRole = require('./etc/objects/SpinButtonPartRole');

var _SpinButtonPartRole2 = _interopRequireDefault(_SpinButtonPartRole);

var _SplitterRole = require('./etc/objects/SplitterRole');

var _SplitterRole2 = _interopRequireDefault(_SplitterRole);

var _StaticTextRole = require('./etc/objects/StaticTextRole');

var _StaticTextRole2 = _interopRequireDefault(_StaticTextRole);

var _StatusRole = require('./etc/objects/StatusRole');

var _StatusRole2 = _interopRequireDefault(_StatusRole);

var _SVGRootRole = require('./etc/objects/SVGRootRole');

var _SVGRootRole2 = _interopRequireDefault(_SVGRootRole);

var _SwitchRole = require('./etc/objects/SwitchRole');

var _SwitchRole2 = _interopRequireDefault(_SwitchRole);

var _TabGroupRole = require('./etc/objects/TabGroupRole');

var _TabGroupRole2 = _interopRequireDefault(_TabGroupRole);

var _TabRole = require('./etc/objects/TabRole');

var _TabRole2 = _interopRequireDefault(_TabRole);

var _TableHeaderContainerRole = require('./etc/objects/TableHeaderContainerRole');

var _TableHeaderContainerRole2 = _interopRequireDefault(_TableHeaderContainerRole);

var _TableRole = require('./etc/objects/TableRole');

var _TableRole2 = _interopRequireDefault(_TableRole);

var _TabListRole = require('./etc/objects/TabListRole');

var _TabListRole2 = _interopRequireDefault(_TabListRole);

var _TabPanelRole = require('./etc/objects/TabPanelRole');

var _TabPanelRole2 = _interopRequireDefault(_TabPanelRole);

var _TermRole = require('./etc/objects/TermRole');

var _TermRole2 = _interopRequireDefault(_TermRole);

var _TextFieldRole = require('./etc/objects/TextFieldRole');

var _TextFieldRole2 = _interopRequireDefault(_TextFieldRole);

var _TimeRole = require('./etc/objects/TimeRole');

var _TimeRole2 = _interopRequireDefault(_TimeRole);

var _TimerRole = require('./etc/objects/TimerRole');

var _TimerRole2 = _interopRequireDefault(_TimerRole);

var _ToggleButtonRole = require('./etc/objects/ToggleButtonRole');

var _ToggleButtonRole2 = _interopRequireDefault(_ToggleButtonRole);

var _ToolbarRole = require('./etc/objects/ToolbarRole');

var _ToolbarRole2 = _interopRequireDefault(_ToolbarRole);

var _TreeRole = require('./etc/objects/TreeRole');

var _TreeRole2 = _interopRequireDefault(_TreeRole);

var _TreeGridRole = require('./etc/objects/TreeGridRole');

var _TreeGridRole2 = _interopRequireDefault(_TreeGridRole);

var _TreeItemRole = require('./etc/objects/TreeItemRole');

var _TreeItemRole2 = _interopRequireDefault(_TreeItemRole);

var _UserInterfaceTooltipRole = require('./etc/objects/UserInterfaceTooltipRole');

var _UserInterfaceTooltipRole2 = _interopRequireDefault(_UserInterfaceTooltipRole);

var _VideoRole = require('./etc/objects/VideoRole');

var _VideoRole2 = _interopRequireDefault(_VideoRole);

var _WebAreaRole = require('./etc/objects/WebAreaRole');

var _WebAreaRole2 = _interopRequireDefault(_WebAreaRole);

var _WindowRole = require('./etc/objects/WindowRole');

var _WindowRole2 = _interopRequireDefault(_WindowRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AXObjectsMap = new Map([['AbbrRole', _AbbrRole2.default], ['AlertDialogRole', _AlertDialogRole2.default], ['AlertRole', _AlertRole2.default], ['AnnotationRole', _AnnotationRole2.default], ['ApplicationRole', _ApplicationRole2.default], ['ArticleRole', _ArticleRole2.default], ['AudioRole', _AudioRole2.default], ['BannerRole', _BannerRole2.default], ['BlockquoteRole', _BlockquoteRole2.default], ['BusyIndicatorRole', _BusyIndicatorRole2.default], ['ButtonRole', _ButtonRole2.default], ['CanvasRole', _CanvasRole2.default], ['CaptionRole', _CaptionRole2.default], ['CellRole', _CellRole2.default], ['CheckBoxRole', _CheckBoxRole2.default], ['ColorWellRole', _ColorWellRole2.default], ['ColumnHeaderRole', _ColumnHeaderRole2.default], ['ColumnRole', _ColumnRole2.default], ['ComboBoxRole', _ComboBoxRole2.default], ['ComplementaryRole', _ComplementaryRole2.default], ['ContentInfoRole', _ContentInfoRole2.default], ['DateRole', _DateRole2.default], ['DateTimeRole', _DateTimeRole2.default], ['DefinitionRole', _DefinitionRole2.default], ['DescriptionListDetailRole', _DescriptionListDetailRole2.default], ['DescriptionListRole', _DescriptionListRole2.default], ['DescriptionListTermRole', _DescriptionListTermRole2.default], ['DetailsRole', _DetailsRole2.default], ['DialogRole', _DialogRole2.default], ['DirectoryRole', _DirectoryRole2.default], ['DisclosureTriangleRole', _DisclosureTriangleRole2.default], ['DivRole', _DivRole2.default], ['DocumentRole', _DocumentRole2.default], ['EmbeddedObjectRole', _EmbeddedObjectRole2.default], ['FeedRole', _FeedRole2.default], ['FigcaptionRole', _FigcaptionRole2.default], ['FigureRole', _FigureRole2.default], ['FooterRole', _FooterRole2.default], ['FormRole', _FormRole2.default], ['GridRole', _GridRole2.default], ['GroupRole', _GroupRole2.default], ['HeadingRole', _HeadingRole2.default], ['IframePresentationalRole', _IframePresentationalRole2.default], ['IframeRole', _IframeRole2.default], ['IgnoredRole', _IgnoredRole2.default], ['ImageMapLinkRole', _ImageMapLinkRole2.default], ['ImageMapRole', _ImageMapRole2.default], ['ImageRole', _ImageRole2.default], ['InlineTextBoxRole', _InlineTextBoxRole2.default], ['InputTimeRole', _InputTimeRole2.default], ['LabelRole', _LabelRole2.default], ['LegendRole', _LegendRole2.default], ['LineBreakRole', _LineBreakRole2.default], ['LinkRole', _LinkRole2.default], ['ListBoxOptionRole', _ListBoxOptionRole2.default], ['ListBoxRole', _ListBoxRole2.default], ['ListItemRole', _ListItemRole2.default], ['ListMarkerRole', _ListMarkerRole2.default], ['ListRole', _ListRole2.default], ['LogRole', _LogRole2.default], ['MainRole', _MainRole2.default], ['MarkRole', _MarkRole2.default], ['MarqueeRole', _MarqueeRole2.default], ['MathRole', _MathRole2.default], ['MenuBarRole', _MenuBarRole2.default], ['MenuButtonRole', _MenuButtonRole2.default], ['MenuItemRole', _MenuItemRole2.default], ['MenuItemCheckBoxRole', _MenuItemCheckBoxRole2.default], ['MenuItemRadioRole', _MenuItemRadioRole2.default], ['MenuListOptionRole', _MenuListOptionRole2.default], ['MenuListPopupRole', _MenuListPopupRole2.default], ['MenuRole', _MenuRole2.default], ['MeterRole', _MeterRole2.default], ['NavigationRole', _NavigationRole2.default], ['NoneRole', _NoneRole2.default], ['NoteRole', _NoteRole2.default], ['OutlineRole', _OutlineRole2.default], ['ParagraphRole', _ParagraphRole2.default], ['PopUpButtonRole', _PopUpButtonRole2.default], ['PreRole', _PreRole2.default], ['PresentationalRole', _PresentationalRole2.default], ['ProgressIndicatorRole', _ProgressIndicatorRole2.default], ['RadioButtonRole', _RadioButtonRole2.default], ['RadioGroupRole', _RadioGroupRole2.default], ['RegionRole', _RegionRole2.default], ['RootWebAreaRole', _RootWebAreaRole2.default], ['RowHeaderRole', _RowHeaderRole2.default], ['RowRole', _RowRole2.default], ['RubyRole', _RubyRole2.default], ['RulerRole', _RulerRole2.default], ['ScrollAreaRole', _ScrollAreaRole2.default], ['ScrollBarRole', _ScrollBarRole2.default], ['SeamlessWebAreaRole', _SeamlessWebAreaRole2.default], ['SearchRole', _SearchRole2.default], ['SearchBoxRole', _SearchBoxRole2.default], ['SliderRole', _SliderRole2.default], ['SliderThumbRole', _SliderThumbRole2.default], ['SpinButtonRole', _SpinButtonRole2.default], ['SpinButtonPartRole', _SpinButtonPartRole2.default], ['SplitterRole', _SplitterRole2.default], ['StaticTextRole', _StaticTextRole2.default], ['StatusRole', _StatusRole2.default], ['SVGRootRole', _SVGRootRole2.default], ['SwitchRole', _SwitchRole2.default], ['TabGroupRole', _TabGroupRole2.default], ['TabRole', _TabRole2.default], ['TableHeaderContainerRole', _TableHeaderContainerRole2.default], ['TableRole', _TableRole2.default], ['TabListRole', _TabListRole2.default], ['TabPanelRole', _TabPanelRole2.default], ['TermRole', _TermRole2.default], ['TextFieldRole', _TextFieldRole2.default], ['TimeRole', _TimeRole2.default], ['TimerRole', _TimerRole2.default], ['ToggleButtonRole', _ToggleButtonRole2.default], ['ToolbarRole', _ToolbarRole2.default], ['TreeRole', _TreeRole2.default], ['TreeGridRole', _TreeGridRole2.default], ['TreeItemRole', _TreeItemRole2.default], ['UserInterfaceTooltipRole', _UserInterfaceTooltipRole2.default], ['VideoRole', _VideoRole2.default], ['WebAreaRole', _WebAreaRole2.default], ['WindowRole', _WindowRole2.default]]);
exports.default = AXObjectsMap;