import {Colors} from '../enums/colors.enum';
import {ToolTypes} from '../enums/tool-types.enum';

export interface DefaultSelectedTools {
    tool: ToolTypes,
    color: Colors,
    lineWidth: number
}
