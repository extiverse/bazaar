<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Carbon\Carbon;
use Flagrow\Bazaar\Jobs\SyncLock;
use Flarum\Core\Exception\PermissionDeniedException;
use Flarum\Http\Controller\ControllerInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Contracts\Hashing\Hasher;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\EmptyResponse;

class RetrieveComposerLockController implements ControllerInterface
{
    /**
     * @var Hasher
     */
    private $hasher;
    /**
     * @var string
     */
    private $hash;
    /**
     * @var SettingsRepositoryInterface
     */
    private $settings;
    /**
     * @var Dispatcher
     */
    private $bus;

    public function __construct(Hasher $hasher, SettingsRepositoryInterface $settings, Dispatcher $bus)
    {
        $this->hasher = $hasher;
        $this->hash = $settings->get('flagrow.bazaar.sync.hash');
        $this->settings = $settings;
        $this->bus = $bus;
    }

    /**
     * @param ServerRequestInterface $request
     * @return \Psr\Http\Message\ResponseInterface
     * @throws PermissionDeniedException
     */
    public function handle(ServerRequestInterface $request)
    {
        $authorization = $request->getHeader('authorization') ?: [];

        if (!$this->hash || !$this->hasher->check(
                array_shift($authorization),
                $this->hash
            )) {

            throw new PermissionDeniedException('Incorrect authorisation');
        }

        $this->settings->set('flagrow.bazaar.last_lock_sync', (string)(new Carbon));

        $this->bus->dispatch(
            new SyncLock
        );

        return new EmptyResponse();
    }
}
