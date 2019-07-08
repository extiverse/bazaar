<?php

namespace Extiverse\Bazaar\Api\Controllers;

use Extiverse\Bazaar\Api\Serializers\ExtensionSerializer;
use Extiverse\Bazaar\Repositories\ExtensionRepository;
use Extiverse\Bazaar\Search\FlagrowApi;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class FavoriteExtensionController extends ConnectedExtensionResourceController
{

    public $serializer = ExtensionSerializer::class;
    /**
     * @var bool
     */
    protected $connected;
    /**
     * @var ExtensionRepository
     */
    protected $extensions;

    function __construct(FlagrowApi $api, SettingsRepositoryInterface $settings, ExtensionRepository $extensions)
    {
        $this->connected = $settings->get('flagrow.bazaar.connected') !== '0';
        $this->extensions = $extensions;
    }

    /**
     * Get the data to be serialized and assigned to the response document.
     *
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return mixed
     * @throws \Exception
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->checkConnected();

        $response = $this->extensions->favorite(
            Arr::get($request->getQueryParams(), 'id'),
            Arr::get($request->getParsedBody(), 'favorite')
        );

        if ($response) {
            return $response;
        }

        throw new \Exception('Could not favorite, connection to service failed.');
    }
}
