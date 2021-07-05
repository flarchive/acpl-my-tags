import Component from 'flarum/common/Component';
import app from 'flarum/forum/app';
import tagLabel from 'flarum/tags/helpers/tagLabel';
import Separator from 'flarum/common/components/Separator';

export default class extends Component {
  view(vnode) {
    const tags = app.store.all('tags').filter((tag) => tag.subscription() === 'follow' || tag.subscription() === 'lurk');

    if (!tags.length) return;

    return (
      <>
        <div className="MyTags">
          <p>{app.translator.trans('acpl-my-tags.forum.index.my_tags')}</p>
          <div className="MyTags__list">{tags.map((tag) => tagLabel(tag, { link: app.route.tag(tag) }))}</div>
        </div>
        <Separator />
      </>
    );
  }
}
