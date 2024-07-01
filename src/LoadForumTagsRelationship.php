<?php

namespace Acpl\MyTags;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Http\RequestUtil;
use Flarum\Tags\Tag;
use Illuminate\Database\Eloquent\Collection;
use Psr\Http\Message\ServerRequestInterface;

class LoadForumTagsRelationship
{
    /** Load tags that a user is following. */
    public function __invoke(ShowForumController $controller, &$data, ServerRequestInterface $request): void
    {
        $actor = RequestUtil::getActor($request);

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

        $tags = $data['tags'] ?? Collection::empty();
        $tags = $tags->merge($followedTags);

        $data['tags'] = $tags;
    }
}
