import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';

import MyTags from './components/MyTags';

app.initializers.add('acpl/my-tags', () => {
  extend(IndexPage.prototype, 'navItems', function (items) {
    if (!app.session.user) return;

    items.add('my-tags', <MyTags />, -13);
  });
});
