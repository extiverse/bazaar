<?php

namespace Extiverse\Bazaar\Api\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\TextResponse;

class SubscriptionRedirectCallbackController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        return new TextResponse('This page should close itself automatically. If it doesn\'t, you can safely close it by hand.');
    }
}
