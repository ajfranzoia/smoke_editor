/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import  {MegadraftIcons as icons} from "megadraft";

export default {
    bold: {type: "inline", label: "B", style: "BOLD", icon: icons.BoldIcon},
    italic: {type: "inline", label: "I", style: "ITALIC", icon: icons.ItalicIcon},
    link: {type: "entity", label: "Link", style: "link", icon: icons.LinkIcon},
    //{type: "separator"},
    subtitle: {type: "block", label: "H2", style: "header-two", icon: icons.H2Icon, className:"subtitle"},
    blockquote: {type: "block", label: "QT", style: "blockquote", icon: icons.BlockQuoteIcon}
};