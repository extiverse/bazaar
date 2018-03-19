<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flarum\Http\Controller\ControllerInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Core\Exception\PermissionDeniedException;
use Illuminate\Contracts\Hashing\Hasher;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Class AbstractAuthorizedController
 * @package Flagrow\Bazaar\Api\Controllers
 *
 * @info Provides an authorized endpoint for our app to connect to this Bazaar.
 *  This will only work in case the Bazaar enabled Flarum installation is connected
 *  to a user account.
 */
class AbstractAuthorizedController implements ControllerInterface
{
    /**
     * @param ServerRequestInterface $request
     * @return \Psr\Http\Message\ResponseInterface
     * @throws PermissionDeniedException
     */
    public function handle(ServerRequestInterface $request)
    {
        $authorization = $request->getHeader('authorization') ?: [];

        if (!$this->hash() || !app(Hasher::class)->check(
                array_shift($authorization),
                $this->hash()
            )) {

            throw new PermissionDeniedException('Incorrect authorisation');
        }
    }

    /**
     * @return string
     */
    private function hash()
    {
        return app(SettingsRepositoryInterface::class)->get('flagrow.bazaar.sync.hash');
    }
}
