// External dependencies
import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';

// Internal dependencies
import MyTags from './components/MyTags';

app.initializers.add('acpl/my-tags', () => {
  extend(IndexPage.prototype, 'navItems', (items) => {
    if (!app.session.user) return;

    items.add('my-tags', <MyTags />, -13);
  });
});
