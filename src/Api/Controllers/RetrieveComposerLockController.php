<?php

namespace Extiverse\Bazaar\Api\Controllers;

use Extiverse\Bazaar\Jobs\SyncLock;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\EmptyResponse;
use Psr\Http\Message\ResponseInterface;

class RetrieveComposerLockController extends AbstractAuthorizedController
{
    /**
     * @var Dispatcher
     */
    private $bus;

    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        parent::handle($request);

        $this->bus->dispatch(
            new SyncLock
        );

        return new EmptyResponse();
    }
}
