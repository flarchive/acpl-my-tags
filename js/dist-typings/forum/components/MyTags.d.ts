import { Vnode, Children } from 'mithril';
import Component from 'flarum/common/Component';
import { ComponentAttrs } from 'flarum/common/Component';
export default class extends Component {
    view(vnode: Vnode<ComponentAttrs, this>): Children;
}
