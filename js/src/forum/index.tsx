import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import MyTags from './components/MyTags';

app.initializers.add('acpl/my-tags', () => {
  extend(IndexSidebar.prototype, 'items', (items) => {
    if (!app.session.user) return;

    items.add('my-tags', <MyTags />, -13);
  });
});
