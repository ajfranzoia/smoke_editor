/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import  {MegadraftIcons as icons} from "megadraft";

export default [
    {type: "inline", label: "B", style: "BOLD", icon: icons.BoldIcon},
    {type: "inline", label: "I", style: "ITALIC", icon: icons.ItalicIcon},
    {type: "entity", label: "Link", style: "link", icon: icons.LinkIcon},
    {type: "separator"},
    {type: "block", label: "H1", style: "header-one", icon: icons.H2Icon},
    {type: "block", label: "H2", style: "header-two", icon: icons.H2Icon, className:"subtitle"},
    {type: "block", label: "QT", style: "blockquote", icon: icons.BlockQuoteIcon}
];