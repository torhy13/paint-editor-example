import {Colors} from '../../enums/colors.enum';
import {ToolTypes} from '../../enums/tool-types.enum';
import {Button} from '../../models/button.model';
import {IconSize} from '../../../enums/Icon-size.enum';
import {IconType} from '../../../enums/Icon-type.enum';

export const toolbarButtons: { toolButtons: Button[], colorPickerButtons: Button[] } = {
  toolButtons: [
    {
      value: ToolTypes.text,
      iconType: IconType.icon_text_color,
      iconSize: IconSize.md,
      title: 'Текст'
    },
    {
      value: ToolTypes.pen,
      iconType: IconType.icon_pencil,
      iconSize: IconSize.md,
      title: 'Карандаш'
    },
    {
      value: ToolTypes.circle,
      iconType: IconType.icon_radio_unchecked,
      iconSize: IconSize.md,
      title: 'Круг'
    },
    {
      value: ToolTypes.rectangle,
      iconType: IconType.icon_checkbox_unchecked,
      iconSize: IconSize.md,
      title: 'Квадрат'
    },
    {
      value: ToolTypes.eraser,
      iconType: IconType.icon_paint_format,
      iconSize: IconSize.md,
      title: 'На самом деле это ластик'
    },
    {
      value: ToolTypes.upload,
      iconType: IconType.icon_unpload,
      iconSize: IconSize.md,
      title: 'Загрузить изображение',
      class: 'toolbar-buttons__btn-upload'
    },
    {
      value: ToolTypes.undo,
      iconType: IconType.icon_undo,
      iconSize: IconSize.md,
      title: 'Отмена',
      class: 'toolbar-buttons__btn-undo'
    }
  ],
  colorPickerButtons: [
    {
      value: Colors.black,
      class: 'toolbar-colorpicker__btn_black'
    },
    {
      value: Colors.red,
      class: 'toolbar-colorpicker__btn_red'
    },
    {
      value: Colors.orange,
      class: 'toolbar-colorpicker__btn_orange'
    },
    {
      value: Colors.green,
      class: 'toolbar-colorpicker__btn_green'
    },
    {
      value: Colors.azure,
      class: 'toolbar-colorpicker__btn_azure'
    },
    {
      value: Colors.blue,
      class: 'toolbar-colorpicker__btn_blue'
    },
    {
      value: Colors.purple,
      class: 'toolbar-colorpicker__btn_purple'
    }
  ]
};
