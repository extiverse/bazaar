<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Search\FlagrowApi;
use Flarum\Core\Exception\PermissionDeniedException;
use Flarum\Http\Controller\ControllerInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class FavoriteExtensionController implements ControllerInterface
{
    /**
     * @var FlagrowApi
     */
    private $api;
    /**
     * @var bool
     */
    private $connected;

    function __construct(FlagrowApi $api, SettingsRepositoryInterface $settings)
    {
        $this->api = $api;
        $this->connected = $settings->get('flagrow.bazaar.connected') === '1';
    }

    /**
     * @param ServerRequestInterface $request
     * @return string
     * @throws \Exception
     */
    public function handle(ServerRequestInterface $request)
    {
        if (!$this->connected) {
            throw new PermissionDeniedException("Bazaar not connected");
        }

        $response = $this->api->post('packages/favorite', [
            'form_params' => [
                'package_id' => Arr::get($request->getParsedBody(), 'extension'),
                'favorite' => Arr::get($request->getParsedBody(), 'favorite')
            ]
        ]);

        if (in_array($response->getStatusCode(), [200, 201, 409])) {
            return $response;
        }

        throw new \Exception('Connecting failed');
    }
}
