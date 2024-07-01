<?php

namespace Acpl\MyTags;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\ApiController(ShowForumController::class))
        ->prepareDataForSerialization(LoadForumTagsRelationship::class),

    (new Extend\Settings())
        ->serializeToForum(
            'my-tags.enable-placeholder',
            'acpl-my-tags.enable-placeholder',
            fn ($value) => ! empty($value)
        ),
];
