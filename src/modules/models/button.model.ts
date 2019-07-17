import {Colors} from '../enums/colors.enum';
import {ToolTypes} from '../enums/tool-types.enum';
import {IconType} from '../../enums/Icon-type.enum';
import {IconSize} from '../../enums/Icon-size.enum';

export interface Button {
    value: ToolTypes | Colors;
    iconType?: IconType;
    iconSize?: IconSize;
    class?: string;
    title?: string;
}
