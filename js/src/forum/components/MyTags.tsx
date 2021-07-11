import { Vnode, Children } from 'mithril';
import Component from 'flarum/common/Component';
import { ComponentAttrs } from 'flarum/common/Component';
import app from 'flarum/forum/app';
// @ts-ignore
import tagLabel from 'flarum/tags/helpers/tagLabel';
import Separator from 'flarum/common/components/Separator';
import Link from 'flarum/common/components/Link';

export default class extends Component {
  view(vnode: Vnode<ComponentAttrs, this>): Children {
    const tags: Array<any> = app.store.all('tags').filter((tag) => tag.subscription() === 'follow' || tag.subscription() === 'lurk');
    const showPlaceholder: boolean = app.forum.attribute('my-tags.enable-placeholder');

    if (!tags.length && !showPlaceholder) return;

    return (
      <>
        <div className="MyTags">
          <p>{app.translator.trans('acpl-my-tags.forum.index.my_tags')}</p>
          {!tags.length && showPlaceholder ? (
            <span>{app.translator.trans('acpl-my-tags.forum.index.placeholder', { a: <Link href={app.route('tags')} /> })}</span>
          ) : (
            <div className="MyTags__list">{tags.map((tag) => tagLabel(tag, { link: app.route.tag(tag) }))}</div>
          )}
        </div>
        <Separator />
      </>
    );
  }
}
