/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Bold from "./bold/action";
import Italic from "./italic/action";
import Subtitle from "./subtitle/action";
import Blockquote from "./blockquote/action";
import People from "./people/action";
import Tag from "./tag/action";
import Link from "./link/action";

export default {
    bold: Bold,
    italic: Italic,
    //subtitle: Subtitle,
    blockquote: Blockquote,
    people: People,
    tag: Tag,
    link: Link
};

/*export default [
  {type: "inline", label: "B", style: "BOLD", icon: icons.BoldIcon},
  {type: "inline", label: "I", style: "ITALIC", icon: icons.ItalicIcon},
  {type: "entity", label: "Link", style: "link", entity: "LINK", icon: icons.LinkIcon},
  {type: "entity", label: "Tag Link", style: "link", entity: "TAG_LINK", icon: icons.TagIcon},
  {type: "separator"},
  {type: "block", label: "UL", style: "unordered-list-item", icon: icons.ULIcon},
  {type: "block", label: "OL", style: "ordered-list-item", icon: icons.OLIcon},
  {type: "block", label: "H2", style: "header-two", icon: icons.H2Icon},
  {type: "block", label: "QT", style: "blockquote", icon: icons.BlockQuoteIcon}
];
*/