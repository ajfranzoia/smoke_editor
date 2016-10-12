/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import icons from "../icons/icons";
import Bold from "./bold/action";
import Italic from "./italic/action";
import Subtitle from "./subtitle/action";
import Blockquote from "./blockquote/action";
import People from "./people/action";
import Tag from "./tag/action";

export default {
    bold: Bold,
    italic: Italic,
    subtitle: Subtitle,
    blockquote: Blockquote,
    people: People,
    tag: Tag,
    link: {type: "entity", label: "Link", style: "link", icon: icons.LinkIcon},
};