import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import type { Children } from 'mithril';
import type ItemList from 'flarum/common/utils/ItemList';

import MyTags from './components/MyTags';

app.initializers.add('acpl/my-tags', () => {
  extend(IndexPage.prototype, 'navItems', (items: ItemList<Children>) => {
    if (!app.session.user) return;

    items.add('my-tags', <MyTags />, -13);
  });
});
