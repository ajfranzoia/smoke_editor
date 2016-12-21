import icons from "../../icons/icons";
import LinkInput from "./LinkInput";
import LinkComponent from "./LinkComponent";

export default {
    type: "entity",
    label: "Link",
    style: "link",
    icon: icons.LinkIcon,
    entity: 'LINK',
    entityInput: LinkInput,
    component: LinkComponent
};

