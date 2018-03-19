<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flarum\Http\Controller\ControllerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\TextResponse;

class SubscriptionRedirectCallbackController implements ControllerInterface
{
    public function handle(ServerRequestInterface $request)
    {
        return new TextResponse('This page should close itself automatically. If it doesn\'t, you can safely close it by hand.');
    }
}
