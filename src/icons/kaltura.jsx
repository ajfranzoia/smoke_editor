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
            <path fill="currentColor" d="M19 0C114.617,0,0,114.615,0,256s114.617,256,256,256s256-114.615,256-256S397.383,0,256,0z M344.48,269.57l-128,80
        c-2.59,1.617-5.535,2.43-8.48,2.43c-2.668,0-5.34-0.664-7.758-2.008C195.156,347.172,192,341.82,192,336V176
        c0-5.82,3.156-11.172,8.242-13.992c5.086-2.836,11.305-2.664,16.238,0.422l128,80c4.676,2.93,7.52,8.055,7.52,13.57
        S349.156,266.641,344.48,269.57z"/>
        </svg>
    );
  }
}