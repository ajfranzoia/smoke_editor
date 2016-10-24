/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";


export default class extends React.Component {
  render() {
    return (
        <svg {...this.props} height="24" width="24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </svg>
    );
  }
}