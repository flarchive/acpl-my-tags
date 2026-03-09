import Component from 'flarum/common/Component';
import app from 'flarum/forum/app';
import Separator from 'flarum/common/components/Separator';
import Link from 'flarum/common/components/Link';
import tagLabel from 'ext:flarum/tags/common/helpers/tagLabel';
import type Tag from 'ext:flarum/tags/common/models/Tag';

interface FollowableTag extends Tag {
  subscription: () => 'not_follow' | 'follow' | 'lurk' | 'ignore' | 'hide';
}

export default class MyTags extends Component {
  view() {
    const tags = app.store.all<FollowableTag>('tags').filter((tag) => tag.subscription() === 'follow' || tag.subscription() === 'lurk');
    const showPlaceholder: boolean = app.forum.attribute('my-tags.enable-placeholder');

    if (!tags.length && !showPlaceholder) return null;

    return (
      <>
        <div className="MyTags" role="group">
          <p className="MyTags__label">{app.translator.trans('acpl-my-tags.forum.index.my_tags')}</p>
          {!tags.length && showPlaceholder ? (
            <span>{app.translator.trans('acpl-my-tags.forum.index.placeholder', { a: <Link href={app.route('tags')} /> })}</span>
          ) : (
            <ul className="MyTags__list">
              {tags.map((tag) => (
                <li key={`myTags-tag-${tag.id()}`}>{tagLabel(tag, { link: app.route.tag(tag) })}</li>
              ))}
            </ul>
          )}
        </div>
        <Separator />
      </>
    );
  }
}
