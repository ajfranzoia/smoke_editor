import icons from "../../icons/icons";
import TagLinkInput from "./TagLinkInput";
import TagLinkComponent from "./TagLinkComponent";

export default {
    type: "entity",
    label: "Tag",
    style: "link",
    icon: icons.TagIcon,
    entity: 'TAG_LINK',
    entityInput: TagLinkInput,
    component: TagLinkComponent
};

