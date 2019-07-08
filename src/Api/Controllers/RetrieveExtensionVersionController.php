<?php

namespace Extiverse\Bazaar\Api\Controllers;

use Extiverse\Bazaar\Jobs\SyncVersion;
use Extiverse\Bazaar\Repositories\ExtensionRepository;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\EmptyResponse;
use Psr\Http\Message\ResponseInterface;

class RetrieveExtensionVersionController extends AbstractAuthorizedController
{
    /**
     * @var Dispatcher
     */
    private $bus;
    /**
     * @var ExtensionRepository
     */
    private $extensions;

    public function __construct(ExtensionRepository $extensions, Dispatcher $bus)
    {
        $this->bus = $bus;
        $this->extensions = $extensions;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        parent::handle($request);

        $id = Arr::get($request->getQueryParams(), 'id');

        $extension = $this->extensions->getExtension($id);

        $this->bus->dispatch(
            new SyncVersion($extension->getInstalledExtension(), $extension->getInstalledVersion())
        );

        return new EmptyResponse();
    }
}
