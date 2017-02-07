import icons from "../../icons/icons";
import PeopleLinkInput from "./PeopleLinkInput";
import PeopleLinkComponent from "./PeopleLinkComponent";


export default {
    type: "entity",
    label: "People",
    style: "link",
    icon: icons.PeopleIcon,
    entity: 'PEOPLE_LINK',
    entityInput: PeopleLinkInput,
    component: PeopleLinkComponent
};

