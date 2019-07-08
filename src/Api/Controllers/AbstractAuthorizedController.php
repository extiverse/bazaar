<?php

namespace Extiverse\Bazaar\Api\Controllers;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Exception\PermissionDeniedException;
use Illuminate\Contracts\Hashing\Hasher;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * Class AbstractAuthorizedController
 * @package Extiverse\Bazaar\Api\Controllers
 *
 * @info Provides an authorized endpoint for our app to connect to this Bazaar.
 *  This will only work in case the Bazaar enabled Flarum installation is connected
 *  to a user account.
 */
class AbstractAuthorizedController implements RequestHandlerInterface
{

    public function handle(ServerRequestInterface $request): ResponseInterface
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
