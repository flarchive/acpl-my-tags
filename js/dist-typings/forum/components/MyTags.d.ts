import type { Children, Vnode } from 'mithril';
import type { ComponentAttrs } from 'flarum/common/Component';
import Component from 'flarum/common/Component';
export default class extends Component {
    view(vnode: Vnode<ComponentAttrs, this>): Children;
}
