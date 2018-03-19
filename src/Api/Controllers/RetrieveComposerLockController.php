<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Jobs\SyncLock;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\EmptyResponse;

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

    /**
     * @param ServerRequestInterface $request
     * @return \Psr\Http\Message\ResponseInterface
     * @throws PermissionDeniedException
     */
    public function handle(ServerRequestInterface $request)
    {
        parent::handle($request);

        $this->bus->dispatch(
            new SyncLock
        );

        return new EmptyResponse();
    }
}
