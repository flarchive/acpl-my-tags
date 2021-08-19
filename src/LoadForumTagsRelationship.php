<?php

namespace Acpl\MyTags;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Http\RequestUtil;
use Flarum\Tags\Tag;
use Illuminate\Database\Eloquent\Collection;
use Psr\Http\Message\ServerRequestInterface;

class LoadForumTagsRelationship
{
    /**
     * Load tags that a user is following
     * @param ShowForumController $controller
     * @param $data
     * @param ServerRequestInterface $request
     */
    public function __invoke(ShowForumController $controller, &$data, ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);

        $followedTags = Tag::query()
            ->join('tag_user', function ($join) use ($actor) {
                $join->on('tag_user.tag_id', '=', 'tags.id');
                $join->on('tag_user.user_id', '=', resolve('db')->raw($actor->id));
                $join->whereNotNull('tag_user.subscription');
            })
            ->select('tags.*')
            ->whereVisibleTo($actor)
            ->get();

        $tags = Collection::empty();
        $tags = $tags->merge($data['tags']);
        $tags = $tags->merge($followedTags);

        $data['tags'] = $tags;
    }
}
