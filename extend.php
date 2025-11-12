<?php

namespace Acpl\MyTags;

use Flarum\Api\Context;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource;
use Flarum\Api\Schema;
use Flarum\Extend;
use Flarum\Tags\Tag;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\ApiResource(Resource\ForumResource::class))
        ->fields(fn () => [
            Schema\Relationship\ToMany::make('myFollowedTags')
                ->type('tags')
                ->includable()
                ->get(function ($model, Context $context) {
                    $actor = $context->getActor();
                    if ($actor->isGuest()) {
                        return [];
                    }

                    $followedTags = Tag::query()
                        ->join('tag_user', function ($join) use ($actor) {
                            $join->on('tag_user.tag_id', '=', 'tags.id')
                                ->where('tag_user.user_id', '=', $actor->id)
                                ->whereIn('tag_user.subscription', ['follow', 'lurk']);
                        })
                        ->select('tags.*')
                        ->whereVisibleTo($actor)
                        ->withStateFor($actor)
                        ->get();

                    return $followedTags->all();
                }),
        ])
        ->endpoint('show', function (Endpoint\Show $endpoint) {
            return $endpoint->addDefaultInclude(['myFollowedTags']);
        }),

    (new Extend\Settings())
        ->serializeToForum('my-tags.enable-placeholder', 'acpl-my-tags.enable-placeholder')
        ->default('my-tags.enable-placeholder', false),
];
