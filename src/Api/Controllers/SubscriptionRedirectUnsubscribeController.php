<?php

namespace Extiverse\Bazaar\Api\Controllers;

use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class SubscriptionRedirectUnsubscribeController extends SubscriptionRedirectController
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $id = Arr::get($request->getQueryParams(), 'id');

        return $this->redirectToFlagrowIOSubscription($id, false);
    }
}
