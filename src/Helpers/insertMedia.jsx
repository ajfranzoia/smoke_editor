/**
 * Copyright (c) 2013-present, Facebook, Inc. All rights reserved.
 *
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

import {
  AtomicBlockUtils,
  Entity,
} from 'draft-js';


export default function insertMedia(editorState) {


  const pid = 'zaraza';
  const entryId = window.prompt('Enter a Kaltura ID');

  if (!entryId) {
    return;
  }

  const entityKey = Entity.create(
    'TOKEN',
    'IMMUTABLE',
    {
      pid: pid,
      entryId: entryId
    }
  );

  return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
}
